import Vue from 'vue'
import Vuex from 'vuex'
import nowCity from './nowCity'
import nowUser from './nowUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      nowCity,
      nowUser
  }
})
