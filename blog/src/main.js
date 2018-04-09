// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store  from './store'
import App from './App'
import router from './router'
import './host.js'

import customAjax from './util/customAjax'
Vue.prototype.$http = customAjax

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
