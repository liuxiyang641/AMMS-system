// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/global.css'
import Session from './js/session.js'
import ajaxPromiser from './js/ajaxPromise.js'
import Axios from './js/axiosService.js'
import reminder from './js/reminder.js'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.prototype.Session = Session
Vue.prototype.ajaxPromise = ajaxPromiser.ajaxPromise
Vue.prototype.$axios=axios;
Vue.prototype.$http=axios;
Vue.prototype.Axios = Axios.Axios
Vue.prototype.remind = reminder.remind
Vue.prototype.unremind = reminder.normal

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})

