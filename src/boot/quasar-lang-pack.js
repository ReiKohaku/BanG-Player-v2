import Settings from 'src/lib/util/settings.js';
import Quasar from 'quasar'
import 'quasar/lang/zh-hans.js'

export default async () => {
  const locale = Settings.get('language');
  const langIso = Settings.langIsoList[locale] || locale // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(`quasar/lang/${langIso}.js`)
      .then(lang => {
        Quasar.lang.set(lang.default)
      })
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
    console.log(err);
  }
}
