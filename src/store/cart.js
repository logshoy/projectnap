let cart = window.localStorage.getItem('cart');
let eighteen = window.localStorage.getItem('eighteen');
export default {
    state: {
        cart: cart ? JSON.parse(cart) : [],
        eighteen: eighteen ? JSON.parse(eighteen) : ""
    },
    mutations: {
        addToCart(state, item) {

            let found = state.cart.find(cart => cart.cartId == item.cartId);

            if (found) {
                found.cartQuantity++;
            } else {
                state.cart.push(item);
            }

        },
        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state, item) {

            let index = state.cart.indexOf(item);
            state.cart.splice(index, 1);

            this.commit('saveData');

        },
        clearCart(state) {
            state.cart.splice(0);
        },
        eighteen(state, item) {
            state.eighteen = item
        },
        saveEighteen(state) {
            window.localStorage.setItem('eighteen', JSON.stringify(state. eighteen));
        },
    },
    actions: {
        addToCart({
            commit
        }, item) {
            commit('addToCart', item)
            commit('saveData');
        },
        removeFromCart({
            commit
        }, item) {
            commit('removeFromCart', item)
        },
        clearCart({
            commit
        }) {
            localStorage.clear();
            commit('clearCart');
        },
        eighteen({commit} ,item) {
            commit('eighteen', item)
            commit('saveEighteen');
        }
    },

    getters: {
        cart(state) {
            return state.cart
        },
        eighteen(state) {
            return state.eighteen
        },
        totalPrice: state => {
            let total = 0;
            state.cart.filter((item) => {
                total += (item.cartPrice * item.cartQuantity);
            });

            return total;
        },
        totalQuantity: state => {
            let total = 0;
            state.cart.filter((item) => {
                total += item.cartQuantity
            })
            return total;
        }
    }
}