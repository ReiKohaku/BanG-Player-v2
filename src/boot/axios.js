import Vue from 'vue'
import axios from 'axios'
import {i18n} from 'src/boot/i18n';
import {Notify} from 'quasar';
import Settings from "src/lib/util/settings";
import Store from 'src/store';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.interceptors.request.use(config => {
  config.cancelToken = new CancelToken(c => {
    Store.commit('axiosCanceller/newCancel', c);
  })
  if (config.url.startsWith('https://bestdori.com'))
    config.url = Settings.usePreferProxyUrl(config.url, true);
  return config;
}, e => {
  return Promise.reject(e);
})

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  let errMsg = '';
  if (!error.message) {
    let code = null;
    try {
      code = error.response.status;
    } catch {
    }
    if (code === 403) {
      errMsg = 'ERR_FORBIDDEN';
    } else if (code === 400) {
      errMsg = 'ERR_BAD_REQUEST';
    } else if (code === 404) {
      errMsg = 'ERR_PAGE_NOT_FOUND';
    } else if (code === 429) {
      errMsg = 'ERR_TOO_MANY_REQUEST';
    } else if (code === 500) {
      errMsg = 'ERR_INTERNAL_SERVER_ERROR';
    }
  } else errMsg = error.message;
  Notify.create({
    message: i18n.t('public.error'),
    caption: i18n.t(errMsg),
    icon: 'mdi-close'
  });
  return Promise.reject(error);
})

Vue.prototype.$axios = axios;
