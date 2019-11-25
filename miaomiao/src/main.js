import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

Vue.config.productionTip = false

import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
Vue.component('Header',Header)
Vue.component('TabBar',TabBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
