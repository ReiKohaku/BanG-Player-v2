import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import Settings from "src/lib/util/settings";

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: Settings.get('language'),
  fallbackLocale: 'en-us',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
