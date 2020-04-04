export default {
    state: {
        cart: []
    },
    mutations: {
        addToCart(state, item) {
            state.cart.push(item)
        }
    },
    // actions: {
    //     addToCart(commit, item) {
    //         commit('addToCart', item)
    //     }
    // },
    getters: {
        cart(state) {
            return state.cart
        },
    }
}