import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SearchResultIndex
    }
  ]
})
