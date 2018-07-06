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

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.prototype.Session = Session
Vue.prototype.ajaxPromise = ajaxPromiser.ajaxPromise
Vue.prototype.Axios = Axios.Axios

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
