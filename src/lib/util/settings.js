import Quasar from 'quasar';

const languageList = ['en-us', 'zh-cn', 'ja-jp'];
const languageName = {
  'en-us': 'English',
  'zh-cn': '中文（简体）',
  'ja-jp': '日本語'
}
const skinList = ['skin00', 'skin04', 'cafe', 'maid', 'april_fool', 'coin'];
const soundList = ['skin', 'skin00', 'skin01', 'skin02', 'skin03', 'persona', 'cafe', 'miku', 'maid', 'april_fool', 'coin'];
const backgroundList = ['skin', 'challenge', 'gbp2020', 'vs', 'persona', 'cafe', 'miku', 'maid', 'coin', 'cover', 'black', 'custom'];
const proxyList = [
  {
    label: 'direct',
    value: 'https://bestdori.com',
    proxy: false
  },
  {
    label: 'fr',
    value: 'https://bestdori.bangplayer.live',
    proxy: true
  },
  {
    label: 'cn1',
    value: 'https://bestdori.reikohaku.fun',
    proxy: true
  },
  {
    label: 'cn2',
    value: 'https://bd.reikohaku.fun',
    proxy: true
  }
];

export {languageList, languageName, skinList, soundList, backgroundList, proxyList};

const defaultConfig = {
  gameConfig: {
    judgeOffset: 0,
    visualOffset: 0,
    speed: 5.0,
    resolution: 1,
    noteScale: 1,
    barOpacity: 0.8,
    backgroundDim: 0.7,
    effectVolume: 1,
    showSimLine: true,
    laneEffect: true,
    mirror: false,
    beatNote: true
  },
  language: Quasar.lang.getLocale(),
  skin: skinList[0],
  sound: soundList[0],
  bg: backgroundList[0],
  customBg: '',
  autoFullscreen: true,
  upperHidden: false,
  upperHiddenImg: '',
  proxy: proxyList[0],
  bgm: {
    src: 'sound/bgm/before_live.mp3',
    cover: 'img/before_live.jpg',
    title: 'ライブしよう!',
    artist: 'BanG Dream!',
    offset: 0,
    timePoints: [{bpm: 140, time: 0}]
  }
}

function copyObject(object) {
  if (!object) return {};
  let result = {};
  try {
    result = JSON.parse(JSON.stringify(object));
  } catch {
  }
  return result;
}

function standardization(config) {
  const config_ = copyObject(config);
  const result = copyObject(defaultConfig);
  for (const i in result) {
    if (config_[i]) result[i] = config_[i];
  }
  return result;
}

const Settings = {
  languageList,
  languageName,
  skinList,
  soundList,
  backgroundList,
  proxyList,
  getAll() {
    let config = {};
    try {
      config = JSON.parse(localStorage.getItem('settings'));
    } catch {
    }
    return standardization(config);
  },
  get(item) {
    return this.getAll()[item];
  },
  setAll(config) {
    localStorage.setItem('settings', JSON.stringify(config));
  },
  set(key, value) {
    const config = this.getAll();
    config[key] = value;
    this.setAll(config);
  },
  getPreferProxyUrl() {
    if (Settings.get('proxy').proxy) return Settings.get('proxy').value;
    else {
      for (const i in proxyList) {
        if (proxyList[i].proxy) return proxyList[i].value;
      }
    }
    return proxyList[0];
  },
  usePreferProxyUrl(url, mustBeProxy) {
    if (!url || typeof url !== 'string') return '';
    if (mustBeProxy) return url.replace('https://bestdori.com', Settings.getPreferProxyUrl());
    else return url.replace('https://bestdori.com', Settings.get('proxy').value);
  },
  getBackgroundUrl(coverUrl) {
    const backgroundType = this.get('bg');
    switch (backgroundType) {
      case 'cover':
        return this.usePreferProxyUrl(coverUrl);
      case 'black':
        return '';
      case 'custom':
        return this.get('customBg');
      case 'skin':
        return `skins/${this.get('skin')}/liveBG_normal.png`;
      default:
        return `skins/${backgroundType}/liveBG_normal.png`;
    }
  },
  getSoundSrc() {
    return `skins/${this.getSoundName()}`;
  },
  getSoundName() {
    const sound = this.get('sound');
    if (sound === 'skin') return this.get('skin');
    else return sound;
  }
};

Settings.install = function (Vue, options) {
  Vue.prototype.$settings = Settings
};

export default Settings;
