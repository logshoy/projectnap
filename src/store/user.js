import * as fb from 'firebase'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({
      commit
    }, {
      email,
      password,
      nickname
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const imageSrc = "https://firebasestorage.googleapis.com/v0/b/hookah69.appspot.com/o/users%2Fplaceholder.png?alt=media&token=eaa608f0-d002-4ffc-848b-4f4aa6fde1d1"
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        await fb.database().ref(`/users/${user.user.uid}/info`).set({
          nickname,
          imageSrc
        })
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser({
      commit
    }, {
      email,
      password
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser({
      commit
    }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser({
      commit
    }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}