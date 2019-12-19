import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import cinemaRouter from './cinema'
import mineRouter from './mine'
import movieRouter from './movie'
import adminRouter from './admin'

const originalPush = VueRouter.prototype.push; //解决报错而已
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
  cinemaRouter,
  mineRouter,
  movieRouter,
  adminRouter,
  {
    path : '/*',
    redirect : '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'lhr',
  routes
})

export default router
