import Vue from 'vue'
import axios from 'axios'
import { i18n } from 'src/boot/i18n';
import { Notify } from 'quasar';

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  let errMsg = '';
  if (!error.message) {
    const code = error.response.status;
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
