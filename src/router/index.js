import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Register from '@/components/Register'

import SearchResultIndex from '@/components/SearchResultIndex'

import ConferenceInfo from '@/components/ConferenceInfo'
import ConferencePaperSubmit from '@/components/ConferencePaperSubmit' 
import ConferencePersonalPaperList from '@/components/ConferencePersonalPaperList'
import ConferenceRegister from '@/components/ConferenceRegister'
import ConferenceReview from '@/components/ConferenceReview'
import ConferenceRegistrationList from '@/components/ConferenceRegistrationList'

import UserInfo from '@/components/UserInfo'
import UserInternals from '@/components/UserInternals'
import UserRelease from '@/components/UserRelease'
import UserConferenceList from '@/components/UserConferenceList'
import UserRegistrationList from '@/components/UserRegistrationList'
import UserPaperList from '@/components/UserPaperList'

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
      component: ConferencePaperSubmit
    },
    {
      path: '/conference/:id/papers',
      component: ConferencePersonalPaperList
    },
    {
      path: '/conference/:id/review',
      component: ConferenceReview
    },
    {
      path: '/conference/:id/attend',
      component: ConferenceRegister
    },
    {
      path: '/conference/:id/all-attend',
      component: ConferenceRegistrationList
    },
    {
      path: '/user/:type/:id/info',
      component: UserInfo
    },
    {
      path: '/user/:type/:id/release',
      component: UserRelease
    },
    {
      path: '/user/:type/:id/conference',
      component: UserConferenceList
    },
    {
      path: '/user/:type/:id/registration',
      component: UserRegistrationList
    },
    {
      path: '/user/:type/:id/paper',
      component: UserPaperList
    },
    {
      path: '/user/:type/:id/internal',
      component: UserInternals
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
