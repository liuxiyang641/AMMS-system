import Vue from 'vue'
import Router from 'vue-router'
import SearchResultIndex from '@/components/SearchResultIndex'
import Index from '@/components/Index'
import ConferenceInfo from '@/components/ConferenceInfo'
import UserInfo from '@/components/UserInfo'
import Register from '@/components/Register'
import PaperSubmission from '@/components/PaperSubmission' 
import ConferencePersonalPaperList from '@/components/ConferencePersonalPaperList'
import ConferencePaperList from '@/components/ConferencePaperList'
import InternalUsers from '@/components/InternalUsers'
import ReleaseConference from '@/components/ReleaseConference'
import ReleasedConferenceList from '@/components/ReleasedConferenceList'

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
      path: '/user/:type/:id/info',
      component: UserInfo
    },
    {
      path: '/user/:type/:id/release',
      component: ReleaseConference
    },
    {
      path: '/user/:type/:id/conference',
      component: ReleasedConferenceList
    },
    {
      path: '/user/:type/:id/internal',
      component: InternalUsers
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
