import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceIndex from '@/components/ConferenceIndex'
import UserIndex from '@/components/UserIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SearchResultIndex
    },
    {
      path: '/search',
      component: SearchResultIndex
    },
    {
      path: '/conference/:id',
      component: ConferenceIndex
    },
    {
      path: '/user/:type/:id',
      component: UserIndex
    }
  ]
})
