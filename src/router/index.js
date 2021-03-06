import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '../components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad
    },
    {
      path: '/category/:category',
      props: true,
      name: 'category',
      component: () => import("@/views/Category.vue")
    },
    {
      path: '/category',
      props: true,
      name: 'categoryAll',
      component: () => import("@/views/CategoryAll.vue")
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeRouteEnter: AuthGuard

    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeRouteEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeRouteEnter: AuthGuard
    }, 
    {
      path: '/cart',
      name: 'cart',
      component: () => import("@/views/Cart.vue"),
      beforeRouteEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("@/views/Profile.vue"),
      beforeRouteEnter: AuthGuard
    },
    {
      path: '*',
      name: '404',
      component: () => import("@/views/404.vue"),
    }
  ],
  mode: 'history'
})