import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import classify from './modules/classify'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    book,
    classify,
    user
  },
  getters
})

export default store
