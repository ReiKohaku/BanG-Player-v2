import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n } from 'src/boot/i18n';
import Store from 'src/store';

import routes from './routes'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    Store.commit('axiosCanceller/doCancel');
    if (to.name === 'info' && !Store.state.chartInfo.chartInfo) next('/');
    if (to.name) {
      const title = i18n.t(`title.${to.name}`);
      if ((to.name === 'info' || to.name === 'game') && Store.state.chartInfo.chartInfo)
        document.title = `${Vue.prototype.$lang.getInLang(i18n.locale, Store.state.chartInfo.chartInfo.title)} - BanG Player`;
      else if (title != `title.${to.name}`) document.title = `${title} - BanG Player`;
      else document.title = `BanG Player`;
    }
    next();
  })

  return Router
}
