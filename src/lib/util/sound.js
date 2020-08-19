async function play(src) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
  try {
    const audio = new window.AudioContext();
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
      audio.decodeAudioData(this.response, function (buffer) {
        const source = audio.createBufferSource();
        source.buffer = buffer;
        source.connect(audio.destination);
        source.start(0);
      }, function (e) {
        console.log(e);
      });
    };
    xhr.send();
  } catch (e) {
    console.log(e);
  }
}

const Sound = {
  tap() {
    play('sound/se/tap.mp3');
  },
  start() {
    play('sound/se/start.mp3');
  },
  perfect(skin) {
    play(`skins/${skin}/perfect.mp3`);
  },
  flick(skin) {
    play(`skins/${skin}/flick.mp3`);
  }
}

Sound.install = function (Vue, options) {
  Vue.prototype.$sound = Sound
};

export default Sound;
