import Vue from 'vue';
import {format} from 'quasar';

const {pad} = format;

const server = ['jp', 'en', 'tw', 'cn', 'kr'];
const diffName = ['easy', 'normal', 'hard', 'expert', 'special'];

function bestdoriLangArrayAsObject(array) {
  const list = {
    'ja': null,
    'en': null,
    'zh-tw': null,
    'zh': null,
    'ko': null
  };
  if (array[0]) list['ja'] = array[0];
  if (array[1]) list['en'] = array[1];
  if (array[2]) list['zh-tw'] = array[2];
  if (array[3]) list['zh'] = array[3];
  if (array[4]) list['ko'] = array[4];
  return list;
}

const OfficialUtil = {
  async getOfficialBandName(bandId) {
    let band = await Vue.prototype.$axios.get(`https://bestdori.fr.reikohaku.fun/api/bands/all.1.json`);
    if (band[bandId]) return bestdoriLangArrayAsObject(band[bandId].bandName);
    else return {
      'ja': '未知のアーティスト',
      'zh': '未知艺术家',
      'zh-tw': '未知藝術家',
      'en': 'Unknown artist',
      'ko': '미 지 의 예술가'
    };
  },

  getOfficialAudioSrc(id, publishedAt) {
    let assetServer = 'jp';
    for (const i in publishedAt) {
      if (publishedAt[i]) {
        assetServer = server[i];
        break;
      }
    }
    return `https://bestdori.com/assets/${assetServer}/sound/bgm${pad(id.toString(), 3)}_rip/bgm${pad(id.toString(), 3)}.mp3`
  },

  getOfficialCoverSrc(id, jacketImage, publishedAt) {
    let assetServer = 'jp';
    for (const i in publishedAt) {
      if (publishedAt[i]) {
        assetServer = server[i];
        break;
      }
    }
    let list = [];
    jacketImage.forEach(item => {
      if (assetServer === 'en') list.push(`https://bestdori.com/assets/en/musicjacket/${item}_rip/jacket.png`);
      else {
        let num = (Math.floor(id / 10) === id / 10) ? id / 10 : Math.floor(id / 10) + 1;
        num *= 10;
        list.push(`https://bestdori.com/assets/${assetServer}/musicjacket/musicjacket${num}_rip/assets-star-forassetbundle-startapp-musicjacket-musicjacket${num}-${item}-jacket.png`);
      }
    })
    return list;
  },

  getOfficialDifficultyList(difficulty) {
    const list = [];
    for (const i in difficulty) {
      list.push({
        type: diffName[i],
        level: difficulty[i].playLevel
      })
    }
    return list;
  }
}

export const Bestdori = {
  async getOfficialSongList() {
    const data = await Vue.prototype.$axios.get('https://bestdori.reikohaku.fun/api/songs/all.5.json');
    const list = [];
    for (const i in data) {
      list.push({
        id: i,
        title: bestdoriLangArrayAsObject(data[i].musicTitle),
        artist: await OfficialUtil.getOfficialBandName(data[i].bandId),
        author: 'Craft Egg',
        audio: OfficialUtil.getOfficialAudioSrc(i, data[i].publishedAt),
        cover: OfficialUtil.getOfficialCoverSrc(i, data[i].jacketImage, data[i].publishedAt),
        difficulty: OfficialUtil.getOfficialDifficultyList(data[i].difficulty)
      });
    }
    return list;
  },
  async getBestdoriChart(config) {
    const params = {
      categoryId: 'chart',
      categoryName: 'SELF_POST',
      following: false,
      limit: 20,
      offset: 0,
      order: 'TIME_DESC'
    };
    for(const i in config) {
      params[i] = config[i];
    }
    const data = await Vue.prototype.$axios.post('https://bestdori.reikohaku.fun/api/post/list', params);
    if(!data.result) throw new Error('Network Error');
    const list = [];
    data.posts.forEach(item => {
      list.push({
        id: item.id,
        title: item.title,
        artist: item.artists,
        author: item.author.nickname || item.author.username,
        audio: item.song.audio,
        cover: item.song.cover,
        difficulty: [
          {
            type: diffName[item.diff],
            level: item.level
          }
        ]
      });
    })
    return { done: params.offset + params.limit >= data.count , list };
  }
};

Bestdori.install = function (Vue, options) {
  Vue.prototype.$bestdori = Bestdori
};

export default Bestdori;
