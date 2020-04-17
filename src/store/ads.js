import * as fb from 'firebase'

class Ad {
  constructor(title, description, price, ownerId, imageSrc = '', category, promo = false, rating, id = null) {
    this.title = title
    this.description = description
    this.price = price
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.category = category
    this.promo = promo
    this.rating = rating
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload
    },
    updateAd(state, {
      title,
      description,
      id
    }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd({
      commit,
      getters
    }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.price,
          getters.user.id,
          '',
          '',
          payload.promo
        )

        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const keys = payload.category
        console.log(newAd)
        console.log(keys)
        let update = {
          [`category/${payload.category}/ads/${ad.key}`]: true,
          [`ads/${ad.key}/category/${payload.category}`]: true
        }
        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref().update(update)
        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })


        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc,
          category: {
            [keys]: true
          }
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds({
      commit
    }) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []
      const ratingAd = []

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          if (ad.comments) {
            Object.keys(ad.comments).forEach(key => {
              const comment = ad.comments[key]
              ratingAd.push(comment.rating)
            })
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const Adrating = ratingAd.reduce(reducer) / ratingAd.length
            resultAds.push(
              new Ad(ad.title, ad.description, ad.price, ad.ownerId, ad.imageSrc, ad.category, ad.promo, Adrating, key)
            )
          } else {
          resultAds.push(
            new Ad(ad.title, ad.description, ad.price, ad.ownerId, ad.imageSrc, ad.category, ad.promo, 0, key)
          )}
        })

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd({
      commit
    }, {
      title,
      description,
      price,
      id
    }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({
          title,
          description,
          price
        })
        commit('updateAd', {
          title,
          description,
          price,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds(state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    categoryAds(state) {
      return categoryId => {
        return state.ads.filter(ad => {
          return Object.keys(ad.category).includes(categoryId)
        })
      }
    },
    adById(state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}