export default {
  btns: {
    LABEL_OFFICIAL: 'BanG Dream Official',
    LABEL_BESTDORI: 'Bestdori! Custom Chart Community',
    LABEL_LOCAL: 'Local',
    LABEL_FAVORITE: 'Favorite',
    LABEL_SETTINGS: 'Settings',
    LABEL_NOTIFICATION: 'Notification',
    LABEL_WIKI: 'Wiki',
    LABEL_MORE: 'More',
    LABEL_CLEAR: 'Clear all data',
    HINT_CLEAR: 'Try clear all data when player goes abnormal.',
    LABEL_START_GAME: 'Let\'s live!',
    LABEL_SELECT_MOD: 'Mods',
    LABEL_PACK: 'Pack',
    LABEL_SHARE: 'Share',
    LABEL_SELECT_A_IMAGE: 'Select a image',
    LABEL_RESET_IMAGE: 'Reset',
    LABEL_EBBB: 'bangbangboom editor test'
  },
  dialogs: {
    directlyStart: {
      title: 'Start by ID',
      message: 'Input the song\'s/chart\'s ID to visit it:'
    }
  },
  title: {
    official: 'Official Charts',
    officialId: 'Loading',
    bestdori: 'Bestdori Charts',
    bestdoriId: 'Loading',
    local: 'Local',
    settings: 'Settings',
    favorite: 'Favorite & History',
    wiki: 'Wiki',
    notification: 'Notification'
  },
  index: {
    subtitle: 'An amazing BanG Dream web simulator'
  },
  mods: {
    title: 'Select Mods'
  },
  favorite: {
    title: 'Favorite',
    INFO_ADD_SUCCESS: 'Add {0} into favorite list successfully.',
    INFO_REMOVE_SUCCESS: 'Remove {0} from favorite list successfully.'
  },
  history: {
    title: 'History',
    INFO_REMOVE_SUCCESS: 'Remove the play history of {0} successfully.'
  },
  pack: {
    TITLE_DOWNLOAD_RESOURCES: 'Downloading resources',
    TITLE_DOWNLOAD_CHART_DATA: 'Download chart data',
    MSG_GETTING_CHART_DATA: 'Getting chart data of difficulty: {0}',
    MSG_GETTING_AUDIO: 'Getting audio...',
    MSG_GETTING_COVER: 'Getting cover...'
  },
  local: {
    bangpack: {
      title: 'BanG Pack',
      select: 'Select a BanG Pack'
    },
    auto: {
      title: 'bangbangboom v2/Bestdori!',
      select: 'Select chart by file',
      chartAudio: 'Audio',
      chartCover: 'Cover',
      chartTitle: 'Title',
      chartArtist: 'Artist',
      chartAuthor: 'Author',
      chartDifficulty: 'Difficulty',
      chartLevel: 'Level',
      load: 'Load',
      defaultTitle: 'Unknown Song',
      defaultArtist: 'Unknown Artist',
      defaultAuthor: 'Unknown Author',
    }
  },
  notification: {
    markAsRead: 'Mark as read',
    markAllAsRead: 'Mark all as read'
  },
  settings: {
    clearConfirm: 'Are you sure you want to clear all data?',
    skins: {
      skin: 'Change with skin',
      skin00: 'Default',
      skin01: 'Skin2',
      skin02: 'Skin3',
      skin03: 'Skin4',
      skin04: 'Skin5',
      challenge: 'Challenge Live',
      vs: 'VS Live',
      persona: 'Revelations: Persona',
      miku: 'Hatsune Miku',
      cafe: 'Would you like some rabbits today?',
      maid: 'Re: Life in a different world from zero',
      gbp2020: 'Garupa 2020',
      april_fool: 'April fool',
      april_fool_2021_cn: 'April fool 2021(CN)',
      april_fool_2021_jp: 'April fool 2021(JP)',
      coin: 'A Certain Scientific Railgun T',
      witch: 'Magical DoReMi',
      cover: 'Use song\'s cover',
      black: 'Black',
      custom: 'Choose a picture you like'
    },
    proxys: {
      direct: 'Direct to Bestdori! (Recommended)',
      cn1: 'China-Zhangjiakou (1Mbps, stable for Chinese users)',
      cn2: 'China-Shanghai (1Mbps, Baidu CDN)',
      cn3: 'China-Beijing (5Mbps, Baidu CDN)',
      cn4: 'China-Shanghai (5Mbps, Tencent & Baidu CDN)',
      fr: 'U.S. (Duplex 200Mbps, cloudflare)'
    },
    live: {
      title: 'Live',
      speed: 'Note Speed',
      noteScale: 'Note Scale',
      judgeOffset: 'Judge Offset',
      visualOffset: 'Visual Offset',
      barOpacity: 'Long Note Transparency',
      backgroundDim: 'Background Dim',
      resolution: 'Resolution',
      showSimLine: 'Dual Tap Line',
      beatNote: 'Off-beat Coloring',
      mirror: 'Mirror',
      laneEffect: 'Lane Effect',
      autoFullscreen: 'Auto Fullscreen',
      upperHidden: 'Upper Hidden',
      upperHiddenImage: 'Upper Hidden Image'
    },
    effect: {
      title: 'Effect & Style',
      skin: 'Skin',
      sound: 'Sound Effect',
      perfect: 'Perfect',
      flick: 'Flick',
      bg: 'Background',
      customBg: 'Custom Background Image',
      effectVolume: 'Effect Volume'
    },
    others: {
      title: 'Others',
      language: 'Language',
      proxy: 'Resource Server',
      testDone: 'Max speed {max}, average speed {avg}',
      bgm: 'Index music',
      resetBgm: 'Reset index music with default'
    }
  },
  ebbb: {
    input: {
      message: 'Please input the ID which display in the dialog after the chart has been uploaded in bangbangboom editor:'
    },
    author: 'bangbangboom editor user'
  },
  public: {
    success: 'Success',
    failed: 'Failed',
    error: 'Error',
    loading: 'Loading...',
    empty: 'Nothing here...',
    search: 'Search',
    tip: 'Tip'
  },
  serviceWorker: {
    cached: 'BanG Player cached successfully, you can create offline application since now.',
    updateFound: 'Discovered new version of BanG Player, downloading...',
    updated: 'A new version available for BanG Player, please refresh.',
    offline: 'No network connection for now. Application will run in offline mode.',
    error: 'An error occurred when register service worker, please check your configuration.'
  },
  TITLE_COPY_SHARE_LINK: 'Copy the share link',
  INFO_COPY_TO_CLIPBOARD_SUCCESS: 'Copy the share link to clipboard successfully!',
  INFO_COPY_TO_CLIPBOARD_FAILED: 'Failed to copy the share link to clipboard, please copy it manually',
  TIP_NOT_HORIZONTAL: 'It is recommended that you set the device horizontally.',
  ERR_CHART_NOT_EXIST: 'This chart is not exist!',
  INFO_SET_INDEX_MUSIC_SUCCESS: 'Set {0} as index music successfully.',
  ERR_SET_INDEX_MUSIC_FAILED: 'Set {0} as index music failed.',
  'Network Error': 'Network error, please check your network connection.',
  statement: 'This application is an open-source-project, you can check it on Github or Gitee. It is also a non-commercial application. All the resources it uses come from the network, developer is not responsible. Once you click to go next, it is determined as you agree with what this statement said.'
}
