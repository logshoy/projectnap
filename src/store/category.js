import * as fb from 'firebase'

export default {
    state: {
        category: {},
        categoryNow: {}
    },
    mutations: {
        featchCategory(state, payload) {
            state.category = payload
        },
        featchThisCategory(state, payload) {
            state.categoryNow = payload
        }
    },
    actions: {
        async featchCategory({
            commit
        }) {
            const category = (await fb.database().ref('category').once('value')).val()
            const list = Object.keys(category)
            commit('featchCategory', list)
        },
        async featchThisCategory({
            commit
        }, {
            categoryNow
        }) {
            const thisCategory = (await fb.database().ref(`category/${categoryNow}/ads`).once('value')).val()
            console.log(Object.keys(thisCategory))
            commit('featchThisCategory',Object.keys(thisCategory))
        },
    },
    getters: {
        category(state) {
            return state.category
        },
        categoryList(state) {
            return state.categoryNow
        }
    }
}