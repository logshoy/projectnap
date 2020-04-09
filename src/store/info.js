import * as fb from 'firebase'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        }
    },
    actions: {
        async updateInfo({
            commit,
            getters
          }, toUpdate) {
            try {
              const uid = await this.getters.user.id
              console.log(uid)
              const updateData = {
                ...getters.info,
                ...toUpdate
              }
              await fb
                .database()
                .ref(`/users/${uid}/info`)
                .update(updateData)
              commit('setInfo', updateData)
            } catch (e) {
              commit('setError', e)
              throw e
            }
          },
    async fetchInfo({
        commit
    }, uid) {
        try {
            const info = (await fb
                .database()
                .ref(`/users/${uid}/info`)
                .once('value')).val()
            commit('setInfo', info)
        } catch (e) {
            commit('setError', e)
            throw e
        }
    },
},
    getters: {
        info: s => s.info
    }
}