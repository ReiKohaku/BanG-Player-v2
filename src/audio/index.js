let audioPlayer = null;
let volume = 1;

const Audio = {
  setPlayer(DOM) {
    audioPlayer = DOM;
    volume = audioPlayer.volume;
  },
  setAudio(src) {
    audioPlayer.src = src;
  },
  doAutoPlay() {
    const playRequest = setInterval(() => {
      try {
        if(audioPlayer.paused) audioPlayer.play();
        else clearInterval(playRequest)
      } catch {}
    }, 1000);
  },
  play() {
    if(audioPlayer) audioPlayer.play();
  },
  pause() {
    if(audioPlayer) audioPlayer.pause();
  },
  paused: () => {
    return audioPlayer ? audioPlayer.paused : true
  },
  currentTime: () => {
    return audioPlayer ? audioPlayer.currentTime : 0.0
  },
  fadeInPlay(onDone) {
    let count = 0;
    let step = volume / 10;
    if(step <= 0) step = 0.01;
    audioPlayer.volume = 0;
    audioPlayer.play();
    let fadeIner = setInterval(() => {
      let target = step * count;
      if(target > 1) target = 1;
      if(target < 0) target = 0;
      audioPlayer.volume = target;
      count++;
      if(audioPlayer.volume >= volume) {
        audioPlayer.volume = volume;
        clearInterval(fadeIner);
        if(onDone) onDone();
      }
    }, 50);
  },
  fadeOutPause(onDone) {
    let count = 0;
    let step = volume / 10;
    if(step <= 0) step = 0.01;
    let fadeOuter = setInterval(() => {
      let target = volume - step * count;
      if(target > 1) target = 1;
      if(target < 0) target = 0;
      audioPlayer.volume = target;
      count++;
      if(audioPlayer.volume <= 0) {
        audioPlayer.pause();
        audioPlayer.volume = volume;
        clearInterval(fadeOuter);
        if(onDone) onDone();
      }
    }, 50);
  },
  changeAudioWithFadeOut(src, onDone) {
    Audio.fadeOutPause(() => {
      audioPlayer.src = src;
      audioPlayer.play();
      if(onDone) onDone();
    })
  },
  setVolume(vol) {
    volume = vol;
    audioPlayer.volume = volume;
  },
  getVolume() {
    return volume;
  }
};

Audio.install = function (Vue, options) {
  Vue.prototype.$audio = Audio
};

export default Audio;
