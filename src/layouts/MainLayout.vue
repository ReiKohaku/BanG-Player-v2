<template>
  <q-layout view="lHh Lpr lFf">
    <audio id="audioPlayer"
           ref="audioPlayer"
           preload="auto"
           loop
           src="sound/bgm/before_live.mp3"/>
    <q-page-container class="bg" v-if="started">
      <router-view />
    </q-page-container>
    <transition appear appear-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-container class="bg cursor-pointer" v-show="!started" @click="onStart">
        <q-page class="flex flex-center">
          <div class="container sgm text-center">
            <div class="text-h3">BanG Player</div>
            <div class="text-body1" :style="`opacity: ${opacity}`">Tap to start</div>
          </div>
        </q-page>
      </q-page-container>
    </transition>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      opacity: 1,
      step: 0.04
    }
  },
  computed: {
    started: {
      get() {
        return this.$store.state.started;
      }
    }
  },
  methods: {
    onStart() {
      this.$sound.start();
      this.$store.commit('setStarted');
      this.$audio.play();
    }
  },
  async mounted() {
    const loader = document.getElementById('loader');
    let loaderOpacity = 1;
    const fadeOut = setInterval(() => {
      if(loaderOpacity <= 0) {
        clearInterval(fadeOut);
        document.removeChild(loader);
      } else {
        loader.style.opacity = loaderOpacity;
        loaderOpacity -= 0.05;
      }
    }, 50);
    const flasher = setInterval(() => {
      if(this.opacity >= 1 || this.opacity <= 0) this.step = -this.step;
      this.opacity += this.step;
      if(this.started) clearInterval(flasher);
    }, 50);
    this.$audio.setPlayer(document.getElementById('audioPlayer'));
  }
}
</script>

<style scoped>
  .bg {
    background-image: url('../../public/img/bg.png');
    background-repeat: repeat;
  }
</style>
