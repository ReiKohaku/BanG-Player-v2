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
  let long = {};

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
    time(item.beat, timepoint)
    switch (item.type) {
      case 'BPM':
        timepoint.push(item);
        break;
      case 'Long':
        if (item.connections[0] && item.connections[1]) {
          const slide = {id: slides.length, flickend: false};
          for (const i in item.connections) {
            notes.push({
              type: "slide",
              lane: item.connections[i].lane,
              time: time(item.connections[i].beat, timepoint),
              slideid: slide.id
            })
            slide.flickend = !!item.connections[i].flick
          }
          slides.push(slide)
        }
      case 'Slide':
        const slide = {id: slides.length, flickend: false};
        for (let i = 0; i < item.connections.length; i++) {
          if (i === 0 || i === item.connections.length - 1 || !item.connections[i].hidden) notes.push({
            type: "slide",
            lane: Math.round(item.connections[i].lane),
            time: time(item.connections[i].beat, timepoint),
            slideid: slide.id
          })
          if (i + 1 === item.connections.length) {
            slide.flickend = !!item.connections[i].flick
          }
        }
        slides.push(slide)
        break;
      case 'Directional':
        notes.push({
          type: "flick",
          lane: item.lane,
          time: time(item.beat, timepoint)
        })
        break;
      case 'Single':
        notes.push({
          type: item.flick ? "flick" : "single",
          lane: item.lane,
          time: time(item.beat, timepoint),
          onbeat: item.beat % 0.5 === 0
        })
        break;
      default:
        break;
    }
  })
  console.log({notes, slides})
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
  } else if (chartInfo.type === 'bangbangboomv2' || (chartData.timepoints && chartData.chart)) {
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
