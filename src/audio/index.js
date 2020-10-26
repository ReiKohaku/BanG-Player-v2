import Vue from 'vue';

let audioPlayer = null;
let volume = 1;
let disable = false;
let state = 'stop';

function _fadeOutPause(onDone, interrupt) {
  if (audioPlayer && !disable) {
    if (state === 'play' || interrupt) {
      state = 'fadeOut';
      let currentSrc = audioPlayer.src;
      let count = 0;
      let step = volume / 10;
      if (step <= 0) step = 0.01;
      let fadeOuter = setInterval(() => {
        if (currentSrc != audioPlayer.src) {
          clearInterval(fadeOuter);
          if (onDone) onDone();
        } else {
          let target = volume - step * count;
          if (target > 1) target = 1;
          if (target < 0) target = 0;
          audioPlayer.volume = target;
          count++;
          if (audioPlayer.volume <= 0) {
            audioPlayer.pause();
            state = 'pause';
            audioPlayer.volume = volume;
            clearInterval(fadeOuter);
            if (onDone) onDone();
          }
        }
      }, 50);
    } else if (onDone) onDone();
  }
}

const Audio = {
  cover: null,
  title: null,
  artist: null,
  setPlayer(DOM) {
    audioPlayer = DOM;
    audioPlayer.addEventListener('timeupdate', () => {
      Vue.prototype.$set(this, 'currentTime_', audioPlayer.currentTime);
    })
  },
  getPlayer() {
    return audioPlayer;
  },
  setAudio(src, cover, title, artist) {
    if (audioPlayer && !disable) {
      audioPlayer.src = src;
      this.cover = cover ? cover : null;
      this.title = title ? title : null;
      this.artist = artist ? artist : null;
    }
  },
  setDefaultAudio() {
    if (audioPlayer && !disable) {
      const bgm = Vue.prototype.$settings.getBgm();
      audioPlayer.src = bgm.src;
      this.title = bgm.title;
      this.artist = bgm.artist;
      this.cover = bgm.cover;
    }
  },
  networkState: () => {
    return audioPlayer.networkState;
  },
  readyState: () => {
    return audioPlayer.readyState;
  },
  doAutoPlay() {
    if (audioPlayer && !disable) {
      let playRequest = setInterval(() => {
        try {
          if (audioPlayer.paused) {
            audioPlayer.play();
            state = 'play';
          } else clearInterval(playRequest)
        } catch {
        }
      }, 1000);
    }
  },
  play() {
    if (audioPlayer && !disable) {
      audioPlayer.volume = volume;
      audioPlayer.play();
      state = 'play';
    }
  },
  pause() {
    if (audioPlayer && !disable) {
      audioPlayer.pause();
      state = 'pause';
    }
  },
  toggle() {
    if (audioPlayer && !disable) {
      if (this.paused()) this.play();
      else this.pause();
    }
  },
  state: () => {
    return state;
  },
  paused: () => {
    return audioPlayer ? audioPlayer.paused : true
  },
  currentTime: () => {
    return audioPlayer ? audioPlayer.currentTime : 0.0;
  },
  currentTime_: 0.0,
  setCurrentTime: (v) => {
    audioPlayer.currentTime = v;
  },
  fadeInPlay(onDone) {
    if (audioPlayer && !disable) {
      if (state === 'pause' || state === 'stop') {
        state = 'fadeIn';
        let currentSrc = audioPlayer.src;
        let count = 0;
        let step = volume / 10;
        if (step <= 0) step = 0.01;
        audioPlayer.volume = 0;
        audioPlayer.play();
        let fadeIner = setInterval(() => {
          if (currentSrc != audioPlayer.src) {
            clearInterval(fadeIner);
            if (onDone) onDone();
          } else {
            let target = step * count;
            if (target > 1) target = 1;
            if (target < 0) target = 0;
            audioPlayer.volume = target;
            count++;
            if (audioPlayer.volume >= volume) {
              audioPlayer.volume = volume;
              clearInterval(fadeIner);
              if (onDone) onDone();
            }
          }
        }, 50);
      } else if (onDone) onDone();
    }
  },
  fadeOutPause(onDone) {
    _fadeOutPause(onDone, true)
  },
  changeAudioWithFadeOut(src, onDone) {
    if (audioPlayer && !disable) {
      _fadeOutPause(() => {
        audioPlayer.src = src;
        state = 'loading';
        audioPlayer.play();
        state = 'play';
        if (onDone) onDone();
      }, true);
    }
  },
  setVolume(vol) {
    if (audioPlayer && !disable) {
      volume = vol;
      audioPlayer.volume = volume;
    }
  },
  getVolume() {
    return volume;
  },
  isDisable: () => {
    return disable;
  },
  setDisable(val) {
    disable = val;
  }
};

Audio.install = function (Vue, options) {
  Vue.prototype.$audio = Audio
};

export default Audio;
