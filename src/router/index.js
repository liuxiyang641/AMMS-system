import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceInfo from '@/components/ConferenceInfo'
import UserIndex from '@/components/UserIndex'
import Register from '@/components/Register'
import PaperSubmission from '@/components/PaperSubmission' 
import ConferencePersonalPaperList from '@/components/ConferencePersonalPaperList'
import ConferencePaperList from '@/components/ConferencePaperList'
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
      path: '/conference/:id/submit',
      component: PaperSubmission
    },
    {
      path: '/conference/:id/papers',
      component: ConferencePersonalPaperList
    },
    {
      path: '/conference/:id/all-paper',
      component: ConferencePaperList
    },
    {
      path: '/user/:id/internal',
      component: InternalUsers
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
