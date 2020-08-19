import Vue from 'vue';
import Store from 'src/store';
import {extend} from 'quasar';

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get: function () {
      return val;
    },
    set: function (newValue) {
      val = newValue;
    }
  })
};

let downloadProgress = null;

const File = {
  /**
   * @param {FileList} file
   * @param {string} type text/dataurl/arraybuffer
   */
  readFile: (file, type = 'text') => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(e.target.result);
      };
      switch (type) {
        case 'text':
          reader.readAsText(file);
          break;
        case 'dataurl':
          reader.readAsDataURL(file);
          break;
        case 'arraybuffer':
          reader.readAsArrayBuffer(file);
          break;
        default:
          break;
      }
    });
  },
  async getFile(url, interval) {
    this.downloadInfo = {
      startAt: new Date().getTime(),
      lastUpdate: new Date().getTime(),
      currentSize: 0,
      totalSize: 0,
      totalTime: 0,
      downloadSpeed: 0,
      averageSpeed: 0,
      progress: 0.0,
      finished: false
    };
    Store.commit('updateDownloadInfo', this.downloadInfo);
    const infoRefresher = setInterval(() => {
      if (!downloadProgress) return;
      const currentTime = new Date().getTime();
      const sizeDifference = downloadProgress.loaded - this.downloadInfo.currentSize;
      const timeDifference = currentTime - this.downloadInfo.lastUpdate;

      this.downloadInfo.lastUpdate = currentTime;
      this.downloadInfo.currentSize = downloadProgress.loaded;
      this.downloadInfo.totalSize = downloadProgress.total;
      this.downloadInfo.totalTime = currentTime - this.downloadInfo.startAt;
      this.downloadInfo.downloadSpeed = Math.round(sizeDifference / (timeDifference / 1000));
      this.downloadInfo.averageSpeed = Math.round(this.downloadInfo.currentSize / this.downloadInfo.totalTime);
      this.downloadInfo.progress = Math.round(this.downloadInfo.currentSize / this.downloadInfo.totalSize * 10000) / 10000;
      this.downloadInfo.finished = false;

      if (downloadProgress.finished) {
        clearInterval(infoRefresher);
        this.downloadInfo = {
          startAt: 0, // timestamp
          lastUpdate: 0, //timestamp
          currentSize: 0, //number, Byte(s)
          totalSize: 0, //number, Byte(s)
          totalTime: 0, //number, ms
          downloadSpeed: 0, //number, Byte(s)/s
          averageSpeed: 0, //number, Byte(s)/s
          progress: 0, //number, percentage, 0~1
          finished: true
        }
      }

      let downloadInfo_ = {};
      extend(true, downloadInfo_, this.downloadInfo);
      Store.commit('updateDownloadInfo', downloadInfo_);
    }, interval || 1000);
    let data = await Vue.prototype.$axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      onDownloadProgress: progress => {
        downloadProgress = progress;
      }
    })
    downloadProgress.finished = true;
    return data;
  },
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
};

File.install = function (Vue, options) {
  Vue.prototype.$file = File
};

export default File;
