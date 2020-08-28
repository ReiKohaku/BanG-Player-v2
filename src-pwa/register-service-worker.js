import { register } from 'register-service-worker'
import { i18n } from 'src/boot/i18n'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready (/* registration */) {
    console.log('Service worker is active.')
  },

  registered (/* registration */) {
    console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    console.log('Content has been cached for offline use.')
	Notify.create({
		message: i18n.t('public.success'),
		caption: i18n.t('serviceWorker.cached'),
		icon: 'mdi-check'
	});
  },

  updatefound (/* registration */) {
    console.log('New content is downloading.')
	Notify.create({
		message: i18n.t('public.tip'),
		caption: i18n.t('serviceWorker.updateFound'),
		icon: 'info'
	});
  },

  updated (/* registration */) {
    console.log('New content is available; please refresh.')
	Notify.create({
		message: i18n.t('public.success'),
		caption: i18n.t('serviceWorker.updated'),
		icon: 'mdi-check'
	});
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
	Notify.create({
		message: i18n.t('public.tip'),
		caption: i18n.t('serviceWorker.offline'),
		icon: 'info'
	});
  },

  error (err) {
    console.error('Error during service worker registration:', err)
	Notify.create({
		message: i18n.t('public.error'),
		caption: i18n.t('serviceWorker.error'),
		icon: 'mdi-close'
	});
  }
})
