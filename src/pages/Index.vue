<template>
  <q-page class="flex flex-center">
    <div v-if="$store.state.special === 'halloween'">
      <div class="absolute-top-left">
        <q-img src="img/happy_halloween.png"
               style="width: 280px;" />
      </div>
    </div>
    <transition appear appear-active-class="animated fadeInDown">
      <div class="absolute-top-right q-ma-sm text-caption text-grey">
        BanG Player App v{{ version }}
      </div>
    </transition>
    <div class="container" style="margin-top: 30px">
      <div class="row q-col-gutter-md justify-center">
        <transition appear
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
          <div class="col-xs-12 col-sm-6 col-md-8 self-center text-center">
            <div class="row q-col-gutter-lg justify-center">
              <div class="col-12">
                <div class="row">
                  <div class="col"/>
                  <div :class="`relative-position col-auto ${!displayMenu ? 'cursor-pointer' : ''}`" @click="doDisplayMenu">
                    <music-circle :src="$store.state.special.length > 0 ? `img/index_${$store.state.special}.png` : 'img/index.png'"
                                  :size="displayMenu ? 208 : 256"
                                  :max-scale="1.08"
                                  :offset="bgm.offset"
                                  :time-points="bgm.timePoints"
                                  :time="$audio.currentTime"
                                  :wave-width="20"
                                  :wave-color="waveColor"
                                  :wave-max-scale="1.12">
                      <template v-slot:center>
                        <div id="eggCounter"
                             class="text-orange-8 text-h1 sgm"
                             style="opacity: 0.2"
                             v-show="new Date().getMonth() === 10 && new Date().getDate() === 1 && $store.state.special !== 'halloween' && eggCount < 11">
                          {{ 11 - eggCount }}
                        </div>
                      </template>
                    </music-circle>
                    <div class="absolute-center" style="width: 100%; height: 100%;" />
                  </div>
                  <div class="col"/>
                </div>
              </div>
              <div class="col-12" v-if="displayMenu">
                <transition appear appear-active-class="animated fadeInDown">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 text-h3 sgm" key="title">BanG Player</div>
                    <div class="col-12 text-body1" key="subtitle">{{ $t('index.subtitle') }}</div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
        <div class="col-xs-12 col-sm-6 col-md-4 self-center" v-if="displayMenu">
          <div class="col-xs-12">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="primary" class="full-width" no-caps size="lg"
                         :label="$t('btns.LABEL_OFFICIAL')" @click="doPush('/official')"/>
                </transition>
              </div>
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="secondary" class="full-width" no-caps size="lg"
                         :label="$t('btns.LABEL_BESTDORI')" @click="doPush('/bestdori')"/>
                </transition>
              </div>
              <div class="col-3">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="white" text-color="grey" class="full-width" no-caps icon="mdi-disc"
                         @click="doPush('/local')"/>
                  <!--:label="$t('btns.LABEL_LOCAL')"-->
                </transition>
              </div>
              <div class="col-3">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="white" text-color="grey" class="full-width" no-caps icon="mdi-star"
                         @click="doPush('/favorite')"/>
                  <!--:label="$t('btns.LABEL_FAVORITE')"-->
                </transition>
              </div>
              <div class="col-3">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="white" text-color="grey" class="full-width" no-caps icon="mdi-settings"
                         @click="doPush('/settings')"/>
                  <!--:label="$t('btns.LABEL_SETTINGS')"-->
                </transition>
              </div>
              <div class="col-3">
                <transition appear appear-active-class="animated fadeInLeft">
                  <div class="relative-position">
                    <q-btn color="white"
                           text-color="grey"
                           class="full-width"
                           no-caps
                           icon="mdi-bell"
                           @click="doPush('/notification')" />
                    <!--:label="$t('btns.LABEL_NOTIFICATION')"-->
                    <q-badge color="red"
                             floating
                             text-color="white"
                             v-if="$store.getters['notification/hasNew']">
                      {{ $store.getters['notification/hasNew'] }}
                    </q-badge>
                  </div>
                </transition>
              </div>
              <div class="col-12">
                <q-btn color="white" text-color="grey" class="full-width" no-caps icon="mdi-dots-vertical"
                       :label="$t('btns.LABEL_MORE')" @click="$sound.tap()">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup @click="doPush('/wiki')">
                        <q-item-section>{{ $t('btns.LABEL_WIKI') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="doPush('/ebbb')">
                        <q-item-section>{{ $t('btns.LABEL_EBBB') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute-top fullscreen" v-show="eggShow">
      <div ref="specialCanvas"
           id="specialCanvas"
           class="relative-position"
           style="user-select: none; -moz-user-select: none; -khtml-user-select: none;"
           unselectable="on"
           onselectstart="return false;"/>
    </div>
  </q-page>
</template>

<script>
  import config from '../../package.json'
  import MusicCircle from "src/components/Style/MusicCircle";

  export default {
    name: 'PageIndex',
    components: {MusicCircle},
    data: function () {
      return {
        displayMenu: false,
        moreOptionsDisplay: false,
        eggCount: 0,
        eggShow: false
      };
    },
    computed: {
      bgm: {
        get() {
          return this.$settings.getBgm();
        }
      },
      version: {
        get() {
          return config.version;
        }
      },
      waveColor: {
        get () {
          switch (this.$store.state.special) {
            case 'halloween':
              return '#F39E12';
              break;
            default:
              return '#FFA4CF';
          }
        }
      },
      screenWidth: {
        get () {
          return document.body.clientWidth;
        }
      }
    },
    methods: {
      doDisplayMenu() {
        const date = new Date();
        if (!this.displayMenu) {
          this.$sound.tap();
          this.displayMenu = true;
        } else if (this.$store.state.special != 'halloween' && date.getMonth() === 10 && date.getDate() === 1) {
          this.eggCount++;
          const eggCounter = document.getElementById('eggCounter');
          eggCounter.style.opacity = `${0.2 + this.eggCount * 0.05}`;
          if (this.eggCount === 11) {
            // Happy Halloween!
            this.eggShow = true;
            let canvas = document.getElementById('specialCanvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.opacity = '0';
            canvas.style.background = '#000';

            let opacity = 0;
            let step = 0.04;
            let masker = setInterval(() => {
              opacity += step;
              canvas.style.opacity = `${opacity}`;
              if (opacity >= 1) {
                clearInterval(masker);
                masker = null;

                const happyText = document.createElement('div');
                happyText.style.textAlign = 'center';
                happyText.style.position = 'absolute';
                happyText.style.top = '50%';
                happyText.style.left = '50%';
                happyText.style.transform = 'translate(-50%, -50%)';
                happyText.style.fontFamily = 'sgm';
                happyText.style.color = 'orange';
                happyText.style.fontSize = '3em';
                happyText.innerHTML = 'HAPPY HALLOWEEN!';
                happyText.unselectable = 'on';
                happyText.onselectstart = () => { return false; };
                happyText.style['-moz-user-select'] = 'none';
                canvas.appendChild(happyText);
                opacity = 1;
                let waitCount = 0;
                if (masker) clearInterval(masker);
                masker = setInterval(() => {
                  if (waitCount <= 60) {
                    waitCount++;
                    return;
                  }
                  opacity -= step;
                  canvas.style.opacity = `${opacity}`;
                  if (opacity <= 0) {
                    this.eggShow = false;
                    clearInterval(masker);
                  }
                }, 20);
              }
            }, 20);

            this.$audio.fadeOutPause(() => {
              this.$settings.set('special', 'halloween');
              this.$audio.setDefaultAudio();
              this.$audio.play();
            });
          }
        } else if (this.$store.state.special === 'halloween') {
          this.$settings.set('special', '');
        }
      },
      async doPush(target) {
        this.$sound.tap();
        this.$q.loading.show();
        await this.$router.push(target);
        this.$q.loading.hide();
      }
    },
    mounted() {
      this.$audio.play();
    }
  }
</script>
