function getFirstNotNull(object) {
  for (const i in object) {
    if (object[i]) return object[i];
  }
}

const Lang = {
  getInLang(locale, object) {
    if (typeof object != 'object') return object;
    if (object[locale]) return object[locale];
    else if (object[locale.substring(0, locale.indexOf('-'))]) return object[locale.substring(0, locale.indexOf('-'))];
    else return getFirstNotNull(object);
  }
}

Lang.install = function (Vue, options) {
  Vue.prototype.$lang = Lang
};

export default Lang;
