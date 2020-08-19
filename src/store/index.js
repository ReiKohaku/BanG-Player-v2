import Vue from 'vue'
import Vuex from 'vuex'

import chartInfo from 'src/store/chartInfo'
import favorite from 'src/store/favorite'
import settings from 'src/store/settings'
import mods from 'src/store/mods'
import axiosCanceller from 'src/store/axiosCanceller'
import downloadDialog from 'src/store/downloadDialog'
import notification from 'src/store/notification'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    chartInfo,
    favorite,
    settings,
    mods,
    axiosCanceller,
    downloadDialog,
    notification
  },
  state: {
    started: false,
    downloadInfo: {
      startAt: 0, // timestamp
      lastUpdate: 0, //timestamp
      currentSize: 0, //number, Byte(s)
      totalSize: 0, //number, Byte(s)
      totalTime: 0, //number, ms
      downloadSpeed: 0, //number, Byte(s)/s
      averageSpeed: 0, //number, Byte(s)/s
      progress: 0, //number, percentage, 0~1
      finished: false
    }
  },
  mutations: {
    setStarted: (state) => {
      state.started = true
    },
    updateDownloadInfo: (state, payload) => {
      let downloadInfo = null;
      try {
        downloadInfo = JSON.parse(JSON.stringify(payload));
        state.downloadInfo = downloadInfo;
      } catch {}
    }
  },
  strict: process.env.DEV
})

// 直接暴露实例，以便在外部js中访问
export default Store;
