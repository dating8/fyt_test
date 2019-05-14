import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Home,
      meta: { keepAlive: false }
    }
  ]
})
