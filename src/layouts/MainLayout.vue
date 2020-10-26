<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class=""
                      :style="`${background}; `"
                      v-if="started">
      <router-view/>
      <top-menu />
    </q-page-container>
    <transition appear appear-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-container class="bg cursor-pointer" v-show="!started" @click="onStart">
        <q-page class="flex flex-center">
          <div class="container sgm text-center">
            <div class="text-h3">BanG Player</div>
            <div class="text-body1" :style="`opacity: ${opacity}`">Tap to start</div>
          </div>
          <div class="container absolute-bottom text-caption text-grey text-center">
            {{ $t('statement') }}
          </div>
        </q-page>
        <download-dialog v-model="downloadDialogDisplay"/>
      </q-page-container>
    </transition>
    <q-footer>
      <music-controller/>
    </q-footer>
  </q-layout>
</template>

<script>
  import MusicController from "src/components/Style/MusicController";
  import DownloadDialog from "src/components/Component/Local/DownloadDialog";
  import TopMenu from "../components/Style/TopMenu";

  export default {
    name: 'MainLayout',
    components: {TopMenu, DownloadDialog, MusicController},
    data() {
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
      },
      downloadDialogDisplay: {
        get() {
          return this.$store.state.downloadDialog.downloadDialog.display;
        },
        set(v) {
          this.$store.commit('downloadDialog/update', {
            display: v
          });
        }
      },
      background: {
        get() {
          switch (this.$store.state.special) {
            case 'halloween':
              return `
              background: url('img/bg${this.$store.state.special.length > 0 ? `_${this.$store.state.special}` : ''}.png') repeat;`;
              break;
            default:
              return `background: url('img/bg.png') repeat`;
          }
        }
      }
    },
    methods: {
      onStart() {
        this.$sound.start();
        this.$store.commit('setStarted');
        if(this.$route.path !== 'info') {
          this.$audio.setDefaultAudio();
          this.$audio.play();
        }
      }
    },
    async mounted() {
      const flasher = setInterval(() => {
        if (this.opacity >= 1 || this.opacity <= 0) this.step = -this.step;
        this.opacity += this.step;
        if (this.started) clearInterval(flasher);
      }, 50);
      this.$store.commit('notification/update', await this.$github.getRaw('ReiKohaku', 'BanG_Player_Wiki', '/notification.json'));
    }
  }
</script>

<style scoped>
  .bg {
    background-image: url('../../public/img/bg.png');
    background-repeat: repeat;
  }
</style>
