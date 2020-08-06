async function play(src) {
  const audio = new Audio(src);
  await audio.play();
  const timer = setInterval(() => {
    if(audio.ended) {
      audio.remove();
      clearInterval(timer);
    }
  }, 500);
}

const Sound = {
  async tap() {
    play('sound/se/tap.mp3');
  },
  async start() {
    play('sound/se/start.mp3');
  }
}

Sound.install = function (Vue, options) {
  Vue.prototype.$sound = Sound
};

export default Sound;
