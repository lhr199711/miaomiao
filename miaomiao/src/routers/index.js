import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import cinemaRouter from './cinema'
import mineRouter from './mine'
import movieRouter from './movie'

const routes = [
  cinemaRouter,
  mineRouter,
  movieRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
