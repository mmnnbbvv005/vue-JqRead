import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import(/* webpackChunkName: "about" */ './views/rank/index.vue')
    },
    {
      path: '/rankList',
      name: 'rankList',
      component: () => import(/* webpackChunkName: "about" */ './views/rank/rankList.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/search/Search.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import(/* webpackChunkName: "about" */ './views/book/info.vue')
    },
    {
      path: '/cata/:id',
      name: 'cata',
      component: () => import(/* webpackChunkName: "about" */ './views/cata/index.vue')
    },
    {
      path: '/read/:id',
      name: 'read',
      component: () => import(/* webpackChunkName: "about" */ './views/book/read.vue')
    },
    {
      path: '/classify',
      name: 'classify',
      component: () => import(/* webpackChunkName: "about" */ './views/classify/index.vue')
    },
    {
      path: '/classifyInfo',
      name: 'classifyInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/classify/classifyInfo.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/index.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import(/* webpackChunkName: "about" */ './views/mine/feedback.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "about" */ './views/mine/setting.vue')
    }
  ]
})
