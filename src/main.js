
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Session from './session.js'
import ajaxPromiser from './ajaxPromise.js'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.prototype.Session = Session
Vue.prototype.ajaxPromise = ajaxPromiser.ajaxPromise

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
