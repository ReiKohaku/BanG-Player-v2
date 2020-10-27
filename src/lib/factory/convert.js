import Vue from 'vue';
import {i18n} from 'src/boot/i18n';
import Store from 'src/store';
import Mods from 'src/lib/factory/mods.js'

function bestdori(content) {
  let timepoint = [];
  let notes = [];
  let slides = [];
  let posA = -1;
  let posB = -1;
  let long = [-1, -1, -1, -1, -1, -1, -1];

  let time = (beat, timepoint) => {
    let time = 0;
    for (let i = 0; i < timepoint.length; i++) {
      if (i === timepoint.length - 1)
        time += (beat - timepoint[i].beat) * 60 / timepoint[i].bpm;
      else if (beat > timepoint[i + 1].beat)
        time += (timepoint[i + 1].beat - timepoint[i].beat) * 60 / timepoint[i].bpm;
      else
        time += (beat - timepoint[i].beat) * 60 / timepoint[i].bpm;
    }
    return time;
  }

  content.forEach(item => {
    switch (item.type) {
      case 'System':
        if (item.cmd === 'BPM') timepoint.push(item);
        break;
      case 'Note':
        let note = {
          time: time(item.beat, timepoint),
          lane: item.lane - 1,
          onbeat: item.beat % 0.5 === 0
        };
        if (item.note === 'Slide') {
          note.type = 'slide';
          if (item.start) {
            let slide = {id: slides.length, flickend: false};
            (item.pos === 'A') ? (posA = slide.id) : (posB = slide.id);
            slides.push(slide);
            note.slideid = slide.id;
          } else if (item.end) {
            note.slideid = (item.pos === 'A') ? posA : posB;
            if (note.slideid === -1) {
              //因为有的谱面有很奇怪的无长度绿条，所以加一个判断
              note.type = item.flick ? 'flick' : 'single';
              break;
            }
            if (item.flick) slides[note.slideid].flickend = true;
            (item.pos === 'A') ? (posA = -1) : (posB = -1);
          } else note.slideid = (item.pos === 'A') ? posA : posB;
        } else if (item.note === 'Long') {
          note.type = 'slide';
          if (item.start) {
            let slide = {id: slides.length, flickend: false};
            long[note.lane] = slide.id;
            note.slideid = slide.id;
            slides.push(slide);
          } else if (item.end) {
            note.slideid = long[note.lane];
            if (item.flick) slides[note.slideid].flickend = true;
            long[note.lane] = -1
          } else note.slideid = long[note.lane]
        } else {
          note.type = item.flick ? 'flick' : 'single';
        }
        notes.push(note);
        break;
      default:
        break;
    }
  })
  return {notes, slides};
}

function bangbangboomv2(content) {
  //使用bangbangboom-editor中的源码重写
  let notes = [];
  let slides = [];
  let noteSlideIndex = {};

  const timeF =  (timepoint, note) => {
    let time = timepoint.time + 60 / timepoint.bpm * note.offset / 48;
    return !time ? 0 : time
  }

  content.slides.forEach(s => {
    noteSlideIndex[s.id] = slides.length;
    slides.push({id: slides.length, flickend: s.flickend});
  })

  content.notes.forEach(n => {
    let timepoint;
    for (let i in content.timepoints)
      if (content.timepoints[i].id === n.timepoint)
        timepoint = content.timepoints[i];
    let note = {
      time: timeF(timepoint, n),
      lane: n.lane,
      onbeat: (n.offset % 24 === 0)
    };
    if (n.type === 'single') note.type = 'single';
    else if (n.type === 'flick') note.type = 'flick';
    else {
      note.type = 'slide';
      note.slideid = noteSlideIndex[n.slide];
    }
    notes.push(note);
  })
  return {notes, slides};
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

export function toMapContent(chartInfo, chartData) {
  let content = null;
  if (chartInfo.type === 'official' || chartInfo.type === 'bestdori' || Array.isArray(chartData)) {
    content = bestdori(chartData);
  } else if (chartInfo.type === 'bangbangboomv2' || (chartData.timepoints && chartData.notes)) {
    content = bangbangboomv2(chartData);
  } else if (chartInfo.type === 'bbbMapContent' || (chartData.notes && chartData.slides)) {
    content = chartData;
  } else throw new Error('ERR_UNKNOWN_CHART_TYPE');
  return content;
}

export async function toGameLoadConfig(chartInfo, chartData, coverIndex) {
  try {
    // 通过chartInfo中的标识符判断chartData类型
    // 也根据chartData特征自行判断
    const gameLoadConfig = {};
    let content = toMapContent(chartInfo, chartData);
    Mods.enableMod(content, Store.state.mods.mod);
    gameLoadConfig.mapContent = () => content;
    gameLoadConfig.musicSrc = Vue.prototype.$settings.usePreferProxyUrl(chartInfo.audio);
    Store.commit('downloadDialog/update', {display: true});
    Store.commit('downloadDialog/update', {title: i18n.t('pack.TITLE_DOWNLOAD_RESOURCES')});
    try {
      Store.commit('downloadDialog/update', {message: i18n.t('pack.MSG_GETTING_AUDIO')});
      let buffer = await Vue.prototype.$file.getFile(gameLoadConfig.musicSrc);
      let blob = new Blob([buffer]);
      // gameLoadConfig.musicSrc = await Vue.prototype.$file.readFile(blob, 'dataurl');
      gameLoadConfig.musicSrc = window.URL.createObjectURL(blob);
      /*
      let musicDataUrl = gameLoadConfig.musicSrc;

      let reader = new FileReader();
      reader.onload = async e => {
        musicDataUrl = reader.result;
      };
      if (blob) {
        await reader.readAsDataURL(blob);
      }
      gameLoadConfig.musicSrc = musicDataUrl;
      */

    } catch(e) {
      if(Vue.prototype.$axios.isCancel(e)) throw new Error('Canceled');
    }
    let coverSrc = '';
    if (typeof chartInfo.cover === 'object' && chartInfo.cover[coverIndex]) coverSrc = chartInfo.cover[coverIndex];
    else coverSrc = chartInfo.cover;
    gameLoadConfig.backgroundSrc = Vue.prototype.$settings.getBackgroundUrl(coverSrc);
    gameLoadConfig.skin = `skins/${Vue.prototype.$settings.get('skin')}`;
    gameLoadConfig.sound = Vue.prototype.$settings.getSoundSrc();
    gameLoadConfig.songName = Vue.prototype.$lang.getInLang(i18n.locale, chartInfo.title);
    return gameLoadConfig;
  } catch(e) {
    throw e;
  } finally {
    Store.commit('downloadDialog/update', {display: false});
  }
};
