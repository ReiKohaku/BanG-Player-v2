import {Notify} from 'quasar';
import {i18n} from 'src/boot/i18n';
import Vue from 'vue';
import Store from "src/store";
import Statistics from "src/lib/api/statistics";

const addFavorite = (state, payload) => {
  if (!payload || !payload.type || !payload.id) return;
  if (state.favoriteList) state.favoriteList.push(payload);
  else state.favoriteList = [payload];
  saveFavorite(state);
  Notify.create({
    message: i18n.t('public.success'),
    caption: i18n.t('favorite.INFO_ADD_SUCCESS', [Vue.prototype.$lang.getInLang(i18n.locale, payload.title)]),
    icon: 'mdi-check'
  });
};

const removeFavorite = (state, payload) => {
  for (const i in state.favoriteList) {
    if (state.favoriteList[i].type === payload.type && state.favoriteList[i].id === payload.id) {
      state.favoriteList.splice(i, 1);
      saveFavorite(state);
      Notify.create({
        message: i18n.t('public.success'),
        caption: i18n.t('favorite.INFO_REMOVE_SUCCESS', [Vue.prototype.$lang.getInLang(i18n.locale, payload.title)]),
        icon: 'mdi-check'
      });
      break;
    }
  }
};

const saveFavorite = (state) => {
  localStorage.setItem('favorite', JSON.stringify(state.favoriteList));
}

export const updateFavorite = (state, payload) => {
  if (isFavorite(state, payload)) {
    for (const i in state.favoriteList) {
      if (state.favoriteList[i].type === payload.type && state.favoriteList[i].id === payload.id) {
        state.favoriteList[i] = payload;
        saveFavorite(state);
        break;
      }
    }
  }
};

const isFavorite = (state, payload) => {
  try {
    const type = payload.type;
    const id = payload.id;
    for (const i in state.favoriteList) {
      if (state.favoriteList[i].type === type && state.favoriteList[i].id === id) {
        return true;
        break;
      }
    }
  } catch {
  }
  return false;
}

export const toggleFavorite = (state, info) => {
  if (isFavorite(state, Store.state.chartInfo.chartInfo)) removeFavorite(state, info);
  else addFavorite(state, info);
};

export const clearFavorite = (state) => {
  state.favoriteList = [];
  saveFavorite(state);
}

const hasHistory = (state, payload) => {
  try {
    const type = payload.type;
    const id = payload.id;
    for (const i in state.historyList) {
      if (state.historyList[i].type === type && state.historyList[i].id === id) {
        return true;
        break;
      }
    }
  } catch {
  }
  return false;
}

const addPlayedCount = async (state, payload) => {
  const type = payload.type;
  const id = payload.id;
  for (const i in state.historyList) {
    if (state.historyList[i].type === type && state.historyList[i].id === id) {
      const now = new Date().getTime();
      let isValidPlay = false;
      if (now - state.historyList[i].last > 30 * 1000) {
        isValidPlay = true;
        state.historyList[i].playCount = state.historyList[i].playCount ? state.historyList[i].playCount + 1 : 1;
      }
      state.historyList[i].last = now;
      const item = state.historyList.splice(i, 1);
      state.historyList.unshift(item[0]);
      saveHistory(state);
      if(isValidPlay) await Statistics.new(type, id);
      break;
    }
  }
}

const saveHistory = (state) => {
  localStorage.setItem('history', JSON.stringify(state.historyList));
}

export const addHistory = async (state, payload) => {
  if (!payload || !payload.type || !payload.id) return;
  if (hasHistory(state, payload)) await addPlayedCount(state, payload);
  else {
    if (!state.historyList) state.historyList = [];
    state.historyList.unshift({playCount: 1, last: new Date().getTime(), ...payload});
    await Statistics.new(payload.type, payload.id);
  }
  saveHistory(state);
}

export const removeHistory = (state, payload) => {
  const type = payload.type;
  const id = payload.id;
  for (const i in state.historyList) {
    if (state.historyList[i].type === type && state.historyList[i].id === id) {
      state.historyList.splice(i, 1);
      saveHistory(state);
      Notify.create({
        message: i18n.t('public.success'),
        caption: i18n.t('history.INFO_REMOVE_SUCCESS', [Vue.prototype.$lang.getInLang(i18n.locale, payload.title)]),
        icon: 'mdi-check'
      });
      break;
    }
  }
}

export const clearHistory = (state) => {
  state.historyList = [];
  saveHistory(state);
}
