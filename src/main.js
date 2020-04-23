import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import BuyModalComponent from '@/components/Shared/BuyModal'
import AddToCart from "@/components/Shared/AddToCart";
import vuetify from './plugins/vuetify'
import localizeFilter from '@/filters/localize.filter.js'
import titlePlugin from '@/utils/title.plugin'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
const stripe = require('stripe')('sk_test_x5C0nOxI8wltXeKDIe9YWCsU008hxOvjkR');
stripe.charges.retrieve('ch_1GaNCUEL2cAqMdqWpzZp0Ont', {
  api_key: 'sk_test_x5C0nOxI8wltXeKDIe9YWCsU008hxOvjkR'
});

Vue.component('app-buy-modal', BuyModalComponent)
Vue.component('add-to-cart', AddToCart)
Vue.filter('localize', localizeFilter)
Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(titlePlugin)
new Vue({
  router,
  store,
  vuetify,
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },

  data: vm => ({
    initialDark: vm.$vuetify
      ? vm.$vuetify.theme.white
      : false,
  }),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyC5zSl537MjcUsvxa7YZ6EBxh9LxQ_E1p0",
      authDomain: "hookah69.firebaseapp.com",
      databaseURL: "https://hookah69.firebaseio.com",
      projectId: "hookah69",
      storageBucket: "hookah69.appspot.com",
      messagingSenderId: "175188051876",
      appId: "1:175188051876:web:249cc5f067030fc4a4a331",
      measurementId: "G-BLVTFYJYMC"
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
        this.$store.dispatch('fetchInfo', user.uid)    
        this.$store.dispatch('fetchCommentedItem', user.uid) 
      }
    })

    

    this.$store.dispatch('fetchAds')
    this.$store.dispatch('featchCategory')

  },
  beforeDestroy () {
    if (!this.$vuetify) return

    this.$vuetify.theme.dark = this.initialDark
  },
  render: h => h(App)
}).$mount('#app')