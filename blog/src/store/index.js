import Vue from 'vue'
import  vuex from 'vuex'

Vue.use(vuex)

import user_store from './user_store.js'

export default new vuex.Store({
  modules: {
    user: user_store,
  }
})
