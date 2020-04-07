import * as fb from 'firebase'

class Ad {
  constructor(title, description, price, ownerId, imageSrc = '', category, promo = false, id = null) {
    this.title = title
    this.description = description
    this.price = price
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.category = category
    this.promo = promo
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
          payload.category,
          payload.promo
        )

        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        console.log(imageSrc)

        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })


        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
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

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(ad.title, ad.description, ad.price, ad.ownerId, ad.imageSrc, ad.category, ad.promo, key)
          )
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
    adById(state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}