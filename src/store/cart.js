let cart = window.localStorage.getItem('cart');

export default {
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },
    mutations: {
        addToCart(state, item) {

            let found = state.cart.find(cart => cart.cartId == item.cartId);

            if(found){
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
    },
    actions: {
        addToCart({commit}, item) {
            commit('addToCart', item)
            commit('saveData');
        },
        removeFromCart({commit}, item) {
            commit('removeFromCart', item)
        }
    },

    getters: {
        cart(state) {
            return state.cart
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