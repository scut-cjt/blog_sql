// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store  from './store'
import App from './App'
import router from './router'
import axios from 'axios'
import './host.js'

Vue.prototype.$http = axios
//全局添加请求头token
axios.defaults.headers.common['x-access-token'] = window.localStorage.getItem('access_token') || '';

Vue.config.productionTip = false

Vue.use(require('vue-moment'));



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
