import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    meta: {
      keepAlive: false
    },
    component: () => import('@/pages/Home')
  }]
})