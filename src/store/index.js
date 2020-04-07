import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'
import orders from './orders'
import cart from './cart'
import info from './info'
import comment from './comment'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ads,
    user,
    shared,
    orders,
    cart,
    info,
    comment
  }
})