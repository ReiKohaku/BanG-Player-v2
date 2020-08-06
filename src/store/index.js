import Vue from 'vue'
import Vuex from 'vuex'

import chartInfo from 'src/store/chartInfo'
import favorite from 'src/store/favorite'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    chartInfo,
    favorite
  },
  state: {
    started: false
  },
  mutations: {
    setStarted: (state) => {
      state.started = true
    }
  },
  strict: process.env.DEV
})

// 直接暴露实例，以便在外部js中访问
export default Store;
