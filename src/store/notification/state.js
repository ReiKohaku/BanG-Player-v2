import {LocalStorage} from "quasar";

export default function () {
  LocalStorage.remove('notification');
  return {
    notification: [],
    readList: LocalStorage.getItem('notification') || []
  }
}
