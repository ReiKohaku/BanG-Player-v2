import {LocalStorage} from "quasar";

export const update = (state, payload) => {
  state.notification = payload;
}

export const setRead = (state, payload) => {
  payload.forEach(item => {
    const key = item.key;
    if(!state.readList.includes(key)) state.readList.push(key);
  })
  LocalStorage.set('notification', state.readList);
}
