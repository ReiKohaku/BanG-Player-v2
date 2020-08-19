import Vue from 'vue'
import {Howl, Howler} from 'howler'

const howl = {
  Howl: null,
  new(config) {
    const player = new Howl(config);
    this.Howl = player;
  }
}

Vue.prototype.$howl = howl
Vue.prototype.$howler = Howler
