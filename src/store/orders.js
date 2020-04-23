import * as fb from 'firebase'

class Order {
  constructor(name, phone, adId, adTitle, amount, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.adTitle = adTitle
    this.amount = amount
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({
      commit,
      getters
    }, {
      phone,
      adId,
      adTitle,
      ownerId
    }) {
      const name = getters.info.nickname
      const order = new Order(name, phone, adId , adTitle, 1)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async createOrderAll({
      commit,
      getters
    }, {
      cart,
      phone
    }) {
      try {
        const name = getters.info.nickname
        for (const item of cart) {
          console.log(item.cartOwner)
          const orderPush = new Order(name, phone, item.cartId, item.cartTitle, item.cartQuantity)
          await fb.database().ref(`/users/${item.cartOwner}/orders`).push(orderPush)
        }
        localStorage.clear();
        commit('clearCart');
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders({
      commit,
      getters
    }) {
      commit('setLoading', true)
      commit('clearError')

      const resultOrders = []

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.adTitle, o.amount, o.done , key)
          )
        })

        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
      }
    },
    async markOrderDone({
      commit,
      getters
    }, payload) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done).reverse()
    },
    undoneOrders(state) {
      return state.orders.filter(o => !o.done).reverse()
    },
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}