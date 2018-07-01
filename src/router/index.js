import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'

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
    }
  ]
})
