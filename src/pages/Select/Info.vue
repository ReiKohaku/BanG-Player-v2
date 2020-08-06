<template>
  <q-page>
    <transition appear appear-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="container">
        <div class="row q-col-gutter-md items-center">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), $router.go(-1)"/>
          </div>
          <div class="col-12 sgm">
            <q-card class="q-pa-md" style="margin-top: 72px;">
              <div class="row q-col-gutter-md">
                <!--封面图和难度展示-->
                <div class="col-xs-12 col-sm-4 col-md-3 text-center"
                     style="margin-top: -72px;">
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <div class="relative-position" style="width: 100%; max-width: 208px; margin: 0 auto">
                        <q-img :src="typeof chartInfo.cover === 'object' ? chartInfo.cover[0] : chartInfo.cover"
                               :ratio="1"
                               class="shadow-12"
                               width="100%"/>
                        <div ref="audioController"
                             class="absolute-bottom-left">
                          <q-btn style="margin: 8px 8px 8px 8px;"
                                 round
                                 color="red"
                                 icon="mdi-music"
                                 size="md"
                                 @click="$sound.tap(), onControllerClick()"/>
                        </div>
                        <q-btn class="absolute-bottom-right"
                               style="margin: 8px 8px 8px 8px;"
                               round
                               :icon="isFavorite ? 'favorite' : 'favorite_border'"
                               color="pink"
                               size="md" :style="'transform: rotate(0deg)'"
                               @click="$sound.tap(), toggleFavorite()"/>
                      </div>
                    </div>
                    <div class="col-12">
                      <diff-icon-list :diffs="chartInfo.difficulty" :size="36"/>
                    </div>
                  </div>
                  </div>
                <!--歌曲信息展示-->
                <div class="col-xs-12 col-sm-8 col-md-9">
                  <div class="row q-col-gutter-sm">
                    <div class="col-xs-12 text-h4">{{ $lang.getInLang($i18n.locale, chartInfo.title) }}</div>
                    <div class="col-xs-12 text-h5">{{ $lang.getInLang($i18n.locale, chartInfo.artist) }}</div>
                    <div class="col-xs-12 text-h6">{{ chartInfo.author }}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
  import DiffIconList from "../../components/Select/DiffIconList";
  import {mapGetters, mapState} from "vuex";

  export default {
    name: "Info",
    components: {DiffIconList},
    data: function () {
      return {
        rotateTimer: null
      };
    },
    computed: {
      chartInfo: {
        get() {
          return this.$store.state.chartInfo.chartInfo;
        }
      },
      ...mapGetters({
        isFavorite: 'favorite/isFavorite'
      })
    },
    methods: {
      onControllerClick() {
        if(this.$audio.paused()) this.$audio.fadeInPlay();
        else this.$audio.fadeOutPause();
      },
      setBtnRotate() {
        if(this.$refs.audioController) {
          this.$refs.audioController.style.transform = `rotate(${-this.$audio.currentTime() * 10}deg)`
        }
      },
      toggleFavorite() {
        this.$store.commit('favorite/toggleFavorite', this.chartInfo);
      }
    },
    async mounted() {
      this.$audio.changeAudioWithFadeOut(this.chartInfo.audio, () => {
        this.rotateTimer = setInterval(this.setBtnRotate, 100);
      });
    },
    async beforeDestroy() {
      if (this.rotateTimer) clearInterval(this.rotateTimer);
      this.$audio.changeAudioWithFadeOut('sound/bgm/before_live.mp3');
    }
  }
</script>
