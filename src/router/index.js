import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ConferenceInfo from '@/components/ConferenceInfo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/conference/:id/info',
            name:'ConferenceInfo',
            component: ConferenceInfo
        }

    ]
})
