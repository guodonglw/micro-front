import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
