import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios';
Vue.prototype.axios = axios;

Vue.config.productionTip = false

import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Scroller from '@/components/Scroller'
Vue.component('Header',Header)
Vue.component('Scroller',Scroller)
Vue.component('TabBar',TabBar)
Vue.filter('setWH',(oldV,newV)=>{
    return oldV.replace(/w\.h/,newV)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
