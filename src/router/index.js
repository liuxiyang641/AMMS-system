import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceInfoIndex from '@/components/ConferenceInfoIndex'

Vue.use(Router)

export default new Router({
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
      path: '/conference/:id/info',
      component: ConferenceInfoIndex
    }
  ]
})
