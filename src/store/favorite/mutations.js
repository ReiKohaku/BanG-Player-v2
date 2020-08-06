import {Notify} from 'quasar';
import {i18n} from 'src/boot/i18n';
import Vue from 'vue';

export const addFavorite = (state, payload) => {
  if (state.favoriteList) state.favoriteList.push(payload);
  else state.favoriteList = [payload];
  Notify.create({
    message: i18n.t('public.success'),
    caption: i18n.t('favorite.INFO_ADD_SUCCESS', [Vue.prototype.$lang.getInLang(i18n.locale, payload.title)]),
    icon: 'mdi-check'
  });
};

export const removeFavorite = (state, payload) => {
  for (const i in state.favoriteList) {
    if (state.favoriteList[i] === payload) {
      state.favoriteList.splice(i, 1);
      break;
    }
  }
  Notify.create({
    message: i18n.t('public.success'),
    caption: i18n.t('favorite.INFO_REMOVE_SUCCESS', [Vue.prototype.$lang.getInLang(i18n.locale, payload.title)]),
    icon: 'mdi-check'
  });
};

export const setFavorite = (state, info, value) => {
  if (value) removeFavorite(state, info);
  else if (!state.favoriteList.includes(info)) addFavorite(state, info);
};

export const toggleFavorite = (state, info) => {
  if (state.favoriteList.includes(info)) removeFavorite(state, info);
  else addFavorite(state, info);
};
