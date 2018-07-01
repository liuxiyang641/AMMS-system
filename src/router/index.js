import Vue from 'vue'
import Router from 'vue-router'
import ConferenceList from '@/components/ConferenceList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ConferenceList
    }
  ]
})
