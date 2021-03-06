import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false

import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('Header',Header)
Vue.component('Scroller',Scroller)
Vue.component('TabBar',TabBar)
Vue.component('Loading',Loading)

Vue.filter('setWH',(oldV,newV)=>{
  return oldV.replace(/w\.h/,newV)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
