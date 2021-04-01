export default {
  btns: {
    LABEL_OFFICIAL: 'BanG Dream官方',
    LABEL_BESTDORI: 'Bestdori!自制谱社区',
    LABEL_LOCAL: '本地',
    LABEL_FAVORITE: '收藏夹',
    LABEL_SETTINGS: '设置',
    LABEL_NOTIFICATION: '通知',
    LABEL_WIKI: 'Wiki',
    LABEL_MORE: '更多',
    LABEL_CLEAR: '清除所有数据',
    HINT_CLEAR: '当播放器不正常时，请尝试清除数据。',
    LABEL_START_GAME: '开始演出吧！',
    LABEL_SELECT_MOD: 'Mods',
    LABEL_PACK: '打包',
    LABEL_SHARE: '分享',
    LABEL_SELECT_A_IMAGE: '选择一张图片',
    LABEL_RESET_IMAGE: '重置',
    LABEL_EBBB: 'bangbangboom editor测试'
  },
  dialogs: {
    directlyStart: {
      title: '通过ID开始',
      message: '输入歌曲或谱面的ID来访问它：'
    }
  },
  title: {
    official: '官方谱面',
    officialId: '载入中',
    bestdori: 'Bestdori谱面',
    bestdoriId: '载入中',
    local: '本地',
    settings: '设置',
    favorite: '收藏夹与历史',
    wiki: 'Wiki',
    notification: '通知'
  },
  index: {
    subtitle: '一款超赞的BanG Dream在线模拟器'
  },
  mods: {
    title: '选择Mods'
  },
  favorite: {
    title: '收藏夹',
    INFO_ADD_SUCCESS: '成功将{0}加入收藏夹。',
    INFO_REMOVE_SUCCESS: '成功将{0}从收藏夹中移除。'
  },
  history: {
    title: '历史',
    INFO_REMOVE_SUCCESS: '成功将{0}从历史记录中移除。'
  },
  pack: {
    TITLE_DOWNLOAD_RESOURCES: '正在下载资源',
    TITLE_DOWNLOAD_CHART_DATA: '正在下载谱面数据',
    MSG_GETTING_CHART_DATA: '正在获取{0}难度的谱面……',
    MSG_GETTING_AUDIO: '获取音频中……',
    MSG_GETTING_COVER: '获取封面中……'
  },
  local: {
    bangpack: {
      title: 'BanG Pack',
      select: '选择BanG Pack'
    },
    auto: {
      title: 'bangbangboom v2/Bestdori!',
      select: '从文件载入谱面',
      chartAudio: '音频文件',
      chartCover: '封面文件',
      chartTitle: '标题',
      chartArtist: '艺术家',
      chartAuthor: '谱面作者',
      chartDifficulty: '难度',
      chartLevel: '等级',
      load: '加载',
      defaultTitle: '未知歌曲',
      defaultArtist: '未知艺术家',
      defaultAuthor: '未知谱师',
    }
  },
  notification: {
    markAsRead: '标记为已读',
    markAllAsRead: '标记全部为已读'
  },
  settings: {
    clearConfirm: '你真的想要清除所有数据吗？',
    skins: {
      skin: '跟随皮肤变化',
      skin00: '默认',
      skin01: '皮肤2',
      skin02: '皮肤3',
      skin03: '皮肤4',
      skin04: '皮肤5',
      challenge: '挑战演出',
      vs: '共演演出',
      persona: '女神异闻录Persona',
      miku: '初音未来',
      cafe: '请问您今天要来点兔子吗？',
      maid: 'Re:从零开始的异世界生活',
      gbp2020: 'Garupa 2020',
      april_fool: '愚人节',
      april_fool_2021_cn: '愚人节2021（国服）',
      april_fool_2021_jp: '愚人节2021（日服）',
      coin: '某科学的超电磁炮T',
      witch: '小魔女doremi',
      cover: '使用歌曲封面',
      black: '纯黑',
      custom: '自定义图片'
    },
    proxys: {
      direct: '直连Bestdori!（推荐）',
      cn1: '中国 张家口（1Mbps）',
      cn2: '中国 上海（1Mbps，百度CDN加速）',
      cn3: '[推荐]中国 北京（5Mbps，百度CDN加速）',
      cn4: '[推荐]中国 上海（5Mbps，腾讯+百度CDN混合加速）',
      fr: '美国（200Mbps，Cloudflare加速）'
    },
    live: {
      title: '演出设定',
      speed: '节奏图标的速度',
      noteScale: '节奏图标的大小',
      judgeOffset: '判定偏移',
      visualOffset: '视觉偏移',
      barOpacity: '长按按键条浓度',
      backgroundDim: '背景图片亮度',
      resolution: '分辨率',
      showSimLine: '同时点击线',
      beatNote: '节奏的色觉辅助',
      mirror: '镜像',
      laneEffect: '判定辅助效果',
      autoFullscreen: '自动全屏',
      upperHidden: '上隐板',
      upperHiddenImage: '上隐板图片'
    },
    effect: {
      title: '皮肤·音量设定',
      skin: '皮肤',
      sound: '音效',
      perfect: 'Tap音',
      flick: 'Flick音',
      bg: '背景',
      customBg: '自定义背景图片',
      effectVolume: '击打效果音量'
    },
    others: {
      title: '其它设定',
      language: '语言',
      proxy: '资源服务器',
      testDone: '最高速度 {max}，平均速度 {avg}',
      bgm: '主页音乐',
      resetBgm: '重置主页音乐为默认'
    }
  },
  ebbb: {
    input: {
      message: '请输入在bangbangboom editor中上传完成后显示的ID：'
    },
    author: 'bangbangboom editor使用者'
  },
  public: {
    success: '成功',
    failed: '失败',
    error: '错误',
    loading: '加载中……',
    empty: '空空如也啊T_T',
    search: '搜索',
    tip: '提示'
  },
  serviceWorker: {
    cached: 'BanG Player已成功缓存到本地，可以创建离线应用。',
    updateFound: '发现BanG Player新版本，正在下载……',
    updated: 'BanG Player新版本已经可用，请刷新页面~',
    offline: '现在没有网络连接，应用使用离线模式运行。',
    error: 'Service worker注册时发生错误，请您检查您的配置是否有问题。'
  },
  TITLE_COPY_SHARE_LINK: '复制链接',
  INFO_COPY_TO_CLIPBOARD_SUCCESS: '成功将分享链接复制到剪切板！',
  INFO_COPY_TO_CLIPBOARD_FAILED: '复制分享链接到剪切板失败，请手动复制。',
  TIP_NOT_HORIZONTAL: '建议您将设备横置游玩。',
  TIP_FORBIDDEN_CHANGE: '有一股神秘的力量阻止你这么做……',
  ERR_CHART_NOT_EXIST: '这张谱面并不存在！',
  INFO_SET_INDEX_MUSIC_SUCCESS: '已经成功将{0}设置为主页音乐~',
  ERR_SET_INDEX_MUSIC_FAILED: '设置{0}为主页音乐失败了QAQ',
  'Network Error': '网络错误，请检查您的网络连接。',
  statement: '本应用为开源应用，您可以在Github或Gitee上查看。这也是一款非商业性质的应用。应用使用的所有资源均来源于网络，与开发者无关。只要您点击屏幕继续，就视为您同意以上所述。'
}
