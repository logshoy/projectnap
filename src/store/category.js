import * as fb from 'firebase'

export default {
    state: {
        category: {}
    },
    mutations: {
        featchCategory(state, payload) {
            state.category = payload
        },
    },
    actions: {
        async featchCategory({
            commit
        }) {
            const category = (await fb.database().ref('category').once('value')).val()
            const list = Object.keys(category)
            commit('featchCategory', list)
        },
    },
    getters: {
        category(state) {
            return state.category
        },
    }
}