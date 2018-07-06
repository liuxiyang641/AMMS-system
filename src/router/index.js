import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceInfo from '@/components/ConferenceInfo'
import UserIndex from '@/components/UserIndex'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/search',
      component: SearchResultIndex
    },
    {
      path: '/conference/:id',
      component: ConferenceInfo
    },
    {
      path: '/user/:id',
      component: UserIndex
    },
    {
      path:'/register',
      component: Register
    } 
  ]
})
