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