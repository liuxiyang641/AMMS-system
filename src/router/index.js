import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/UserIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:type/:id',
      component: UserIndex
    }
  ]
})
