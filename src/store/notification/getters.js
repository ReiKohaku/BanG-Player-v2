import {LocalStorage} from "quasar";

export const hasNew = (state) => {
  let count = 0
  for(const item of state.notification) {
    if(!state.readList.includes(item.key)) count++;
  };
  return count;
}

export const readList = (state) => {
  return state.readList;
}
