import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import *as fb from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
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
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
