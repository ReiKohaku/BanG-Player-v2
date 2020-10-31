let audio;
let srcs = {};

async function play(name, src) {
  if (!audio) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    audio = new window.AudioContext();
  }
  if (!srcs[name] || srcs[name].src !== src) {
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
      try {
        audio.decodeAudioData(this.response, function (buffer) {
          const source = audio.createBufferSource();
          source.buffer = buffer;
          source.connect(audio.destination);
          source.start(0);
          srcs[name] = {
            src, buffer
          };
        }, function (e) {
          console.log('SFX error', e);
        });
      } catch {
      }
    };
    xhr.send();
  } else {
    const source = audio.createBufferSource();
    source.buffer = srcs[name].buffer;
    source.connect(audio.destination);
    source.start(0);
  }
  try {
  } catch (e) {
    console.log(e);
  }
}

const Sound = {
  async tap() {
    await play('tap', 'sound/se/tap.mp3');
  },
  async start() {
    await play('start', 'sound/se/start.mp3');
  },
  async perfect(skin) {
    await play('perfect', `skins/${skin}/perfect.mp3`);
  },
  async flick(skin) {
    await play('flick', `skins/${skin}/flick.mp3`);
  }
}

Sound.install = function (Vue, options) {
  Vue.prototype.$sound = Sound
};

export default Sound;
