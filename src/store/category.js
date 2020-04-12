import * as fb from 'firebase'

export default {
    state: {
        category: {}
    },
    mutations: {
        featchCategory(state,payload) {
            state.category = payload
        }
    },
    actions: {
        async featchCategory({commit}) {
            // categoryList = []
            const category = (await fb.database().ref('category').once('value')).val()
            const list = Object.keys(category)
            // Object.keys(category).forEach(key =>{
            //     const ad = ads[key]
            //     categoryList.push()
            // })
            console.log(list)
            commit('featchCategory', list)
        }

    },
    getters: {
        category(state) {
            return state.category
        }
    }
}