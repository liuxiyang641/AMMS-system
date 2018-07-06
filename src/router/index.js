import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceInfo from '@/components/ConferenceInfo'
import UserIndex from '@/components/UserIndex'
import Register from '@/components/Register'
import PaperSubmission from '@/components/PaperSubmission' 
import PaperList from '@/components/PaperList'
import InternalUsers from '@/components/InternalUsers'

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
      path: '/conference/:id/info',
      component: ConferenceInfo,
    },
    {
      path: '/conference/:id/paper-submission',
      component: PaperSubmission
    },
    {
      path: '/conference/:id/paper-list',
      component: PaperList
    },
    {
      path: '/user/:id/internal-user-manage',
      component: InternalUsers
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
