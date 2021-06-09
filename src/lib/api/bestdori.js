import Vue from 'vue';
import {format} from 'quasar';

const {pad} = format;

const server = ['jp', 'en', 'tw', 'cn', 'kr'];
const diffName = ['easy', 'normal', 'hard', 'expert', 'special'];

let officialChartList = null;
let bandNameList = null;

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
  async getOfficialBandName(bandId, refresh) {
    if(refresh || !bandNameList) bandNameList = await Vue.prototype.$axios.get(`https://bestdori.com/api/bands/all.1.json`);
    if (bandNameList[bandId]) return bestdoriLangArrayAsObject(bandNameList[bandId].bandName);
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
      let num = (Math.floor(id / 10) === id / 10) ? id / 10 : Math.floor(id / 10) + 1;
      num *= 10;
      list.push(`https://bestdori.com/assets/${assetServer}/musicjacket/musicjacket${num}_rip/assets-star-forassetbundle-startapp-musicjacket-musicjacket${num}-${item}-jacket.png`);
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

const getSifInfo = async (id) => {
  let data = await Vue.prototype.$axios.get('https://bestdori.com/api/misc/llsif.5.json');
  if (data && data[id]) return data[id];
  else throw new Error('ERR_NO_LLSIF_SONG_DATA');
}

const CommunityUtil = {
  getAudioSrc: async (item) => {
    try {
      switch (item.type) {
        case 'custom':
          return item.audio;
        case 'bandori':
          return (await Bestdori.getOfficialSongInfo(item.id)).audio;
        case 'llsif':
          return `https://card.llsif.moe/asset/${(await getSifInfo(item.id)).mp3}`;
        case 'osu':
          return `https://beatconnect.io/audio/${item.id}/${item.diff}/`;
        default:
          return ''
      }
    } catch {
      return '';
    }
  },
  getCoverSrc: async (item) => {
    try {
      switch (item.type) {
        case 'custom':
          return item.cover;
        case 'bandori':
          return (await Bestdori.getOfficialSongInfo(item.id)).cover;
        case 'llsif':
          return `https://card.llsif.moe/asset/${(await getSifInfo(item.id)).cover}`;
        case 'osu':
          return `https://assets.ppy.sh/beatmaps/${item.id}/covers/cover.jpg`;
        default:
          return ''
      }
    } catch {
      return '';
    }
  }
}

export const Bestdori = {
  async getOfficialSongList(refresh) {
    if(refresh || !officialChartList)
      officialChartList = await Vue.prototype.$axios.get('https://bestdori.com/api/songs/all.5.json');
    const list = [];
    for (const i in officialChartList) {
      list.push({
        id: i,
        type: 'official',
        title: bestdoriLangArrayAsObject(officialChartList[i].musicTitle),
        artist: await OfficialUtil.getOfficialBandName(officialChartList[i].bandId),
        author: 'Craft Egg',
        audio: OfficialUtil.getOfficialAudioSrc(i, officialChartList[i].publishedAt),
        cover: OfficialUtil.getOfficialCoverSrc(i, officialChartList[i].jacketImage, officialChartList[i].publishedAt),
        difficulty: OfficialUtil.getOfficialDifficultyList(officialChartList[i].difficulty)
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
    for (const i in config) {
      params[i] = config[i];
    }
    const data = await Vue.prototype.$axios.post('https://bestdori.com/api/post/list', params);
    if (!data.result) throw new Error('Network Error');
    const list = [];
    for (const item of data.posts) {
      list.push({
        id: item.id,
        type: 'bestdori',
        title: item.title,
        artist: item.artists,
        author: item.author.nickname || item.author.username,
        audio: await CommunityUtil.getAudioSrc(item.song),
        cover: await CommunityUtil.getCoverSrc(item.song),
        difficulty: [
          {
            type: diffName[item.diff],
            level: item.level
          }
        ]
      });
    }
    return {done: params.offset + params.limit >= data.count, list};
  },
  async getOfficialSongInfo(id) {
    const data = await Vue.prototype.$axios.get(`https://bestdori.com/api/songs/${id}.json`);
    return {
      id,
      type: 'official',
      title: bestdoriLangArrayAsObject(data.musicTitle),
      artist: await OfficialUtil.getOfficialBandName(data.bandId),
      author: 'Craft Egg',
      audio: OfficialUtil.getOfficialAudioSrc(id, data.publishedAt),
      cover: OfficialUtil.getOfficialCoverSrc(id, data.jacketImage, data.publishedAt),
      difficulty: OfficialUtil.getOfficialDifficultyList(data.difficulty)
    }
  },
  async getOfficialChartData(id, diff) {
    const data = await Vue.prototype.$axios.get(`https://bestdori.com/api/charts/${id}/${diff}.json`);
    return data;
  },
  async getCommunityChartInfo(id) {
    const data = await Vue.prototype.$axios.get('https://bestdori.com/api/post/details', {
      params: {id}
    });
    const item = data.post;
    return {
      id,
      type: 'bestdori',
      title: item.title,
      artist: item.artists,
      author: item.author.nickname || item.author.username,
      audio: await CommunityUtil.getAudioSrc(item.song),
      cover: await CommunityUtil.getCoverSrc(item.song),
      difficulty: [
        {
          type: diffName[item.diff],
          level: item.level
        }
      ]
    };
  },
  async getCommunityChartData(id) {
    const data = await Vue.prototype.$axios.get('https://bestdori.com/api/post/details', {
      params: {id}
    });
    return data;
  }
};

Bestdori.install = function (Vue, options) {
  Vue.prototype.$bestdori = Bestdori
};

export default Bestdori;
