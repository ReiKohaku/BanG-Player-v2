<template>
  <div style="background-color: black">
    <q-btn flat
           round
           text-color="secondary"
           class="fixed-top-right"
           style="z-index: 99;"
           :icon="$q.fullscreen.isActive ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
           @click="doFullScreen"/>
    <div class="fixed-bottom"
         style="z-index: 99;"
         v-if="mod && modHelperList[mod] && mod.length > 0">
      <div class="text-center">
        <q-badge :color="modHelperList[mod].color">
          {{ modHelperList[mod].text }} mod ON
        </q-badge>
      </div>
    </div>
    <div id="gameContainer" @contextmenu.prevent="">
    </div>
    <upper-hidden-board v-show="isUpperHiddenBoardDisplay" :src="src"/>
  </div>
</template>

<script>
import {Game} from 'bangbangboom-game';
import UpperHiddenBoard from "src/components/Style/UpperHiddenBoard";
import {dom} from 'quasar';

const {height, width} = dom;

export default {
  name: "Game",
  components: {UpperHiddenBoard},
  data: function () {
    return {
      isUpperHiddenBoardDisplay: false,
      src: ''
    };
  },
  computed: {
    mod: {
      get() {
        return this.$store.state.mods.mod;
      }
    },
    modHelperList: {
      get() {
        return this.$store.state.mods.modHelperList;
      }
    }
  },
  methods: {
    doFullScreen() {
      try {
        this.$q.fullscreen.toggle();
      } catch {
      }
    }
  },
  async mounted() {
    this.$audio.pause();
    this.$audio.setDisable(true);
    /*
    如果游戏配置或载入配置为空，退回到主页面
    是为了防止用户从游戏页面退出浏览器后，再次返回浏览器，配置丢失而导致载入失败
    */
    let settings, gameConfig, gameLoadConfig = null;
    try {
      settings = this.$store.getters['settings/settings'];
      gameConfig = settings.gameConfig;
      gameLoadConfig = this.$store.state.chartInfo.gameLoadConfig;
    } catch {
      await this.$router.push('/');
      return;
    }
    if (!gameConfig || !gameLoadConfig) {
      await this.$router.push('/');
      return;
    }

    /*禁止ios缩放，双击和双指*/
    try {
      // 禁用双击缩放
      document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.addEventListener(
        "touchend",
        function (event) {
          var now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );
      // 禁用双指手势操作
      document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
      });
    } catch {
    }

    let gameContainer = document.getElementById('gameContainer');
    let canvas = document.createElement('canvas');
    canvas.id = 'game';
    canvas.style.height = '100%';
    canvas.style.width = '100%';
    gameContainer.appendChild(canvas);

    try {
      if (settings.autoFullscreen && !this.$q.fullscreen.isActive) await this.$q.fullscreen.toggle();
    } catch {
    }

    this.isUpperHiddenBoardDisplay = settings.upperHidden;
    if (this.isUpperHiddenBoardDisplay) this.src = `url(${settings.upperHiddenImg})`;

    if (document.documentElement.clientHeight > document.documentElement.clientWidth)
      this.$q.notify({
        message: this.$t('public.tip'),
        caption: this.$t('TIP_NOT_HORIZONTAL'),
        icon: 'info'
      })

    let game = null;
    try {
      game = new Game(canvas, gameConfig, gameLoadConfig);
      game.start();
      game.ondestroyed = () => {
        gameContainer.removeChild(canvas);
        this.$router.push('/');
      };
    } catch (e) {
      await this.$router.push('/');
    }
  },
  beforeDestroy() {
    this.$audio.setDisable(false);
    this.$audio.setDefaultAudio();
    this.$audio.play();
  }
}
</script>

<style scoped>
#gameContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
</style>
