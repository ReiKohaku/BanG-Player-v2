import {LocalStorage} from "quasar";

export default function () {
  return {
    notification: [],
    readList: LocalStorage.getItem('notification') || []
  }
}
