import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import axios from 'axios'
import Icon from 'vue-svg-icon/Icon.vue'
import { Popup, InfiniteScroll, Lazyload } from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.component(Popup.name, Popup)
import './assets/less/global.css'

// 定义全局变量
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.component('icon', Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
