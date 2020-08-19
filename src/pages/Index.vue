<template>
  <q-page class="flex flex-center">
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
          <div class="col-xs-12 col-sm-6 col-md-8 self-center text-center sgm">
            <div class="row q-col-gutter-lg justify-center">
              <div class="col-12">
                <div class="row">
                  <div class="col"/>
                  <div :class="`col-auto ${!displayMenu ? 'cursor-pointer' : ''}`" @click="doDisplayMenu">
                    <music-circle src="img/index.png"
                                  :size="displayMenu ? 208 : 256"
                                  :max-scale="1.08"
                                  :offset="bgm.offset"
                                  :time-points="bgm.timePoints"
                                  :time="$audio.currentTime"
                                  :wave-width="20"
                                  wave-color="#FFA4CF"
                                  :wave-max-scale="1.12"/>
                  </div>
                  <div class="col"/>
                </div>
              </div>
              <div class="col-12" v-if="displayMenu">
                <transition appear appear-active-class="animated fadeInDown">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 text-h3" key="title">BanG Player</div>
                    <div class="col-12 text-body1" key="subtitle">{{ $t('index.subtitle') }}</div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
        <div class="col-xs-12 col-sm-6 col-md-4 txjlcyj self-center" v-if="displayMenu">
          <div class="col-xs-12">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="primary" class="full-width" no-caps
                         :label="$t('btns.LABEL_OFFICIAL')" @click="doPush('/official')"/>
                </transition>
              </div>
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="secondary" class="full-width" no-caps
                         :label="$t('btns.LABEL_BESTDORI')" @click="doPush('/bestdori')"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="primary" class="full-width" no-caps
                         :label="$t('btns.LABEL_LOCAL')" @click="doPush('/local')"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="pink" class="full-width" no-caps
                         :label="$t('btns.LABEL_FAVORITE')" @click="doPush('/favorite')"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="primary" class="full-width" no-caps
                         :label="$t('btns.LABEL_SETTINGS')" @click="doPush('/settings')"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInLeft">
                  <div class="relative-position">
                    <q-btn color="primary"
                           class="full-width"
                           no-caps
                           :label="$t('btns.LABEL_NOTIFICATION')"
                           @click="doPush('/notification')" />
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
                <transition appear appear-active-class="animated fadeInLeft">
                  <q-btn color="primary" class="full-width" no-caps
                         :label="$t('btns.LABEL_WIKI')" @click="doPush('/wiki')"/>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        displayMenu: false
      };
    },
    computed: {
      bgm: {
        get() {
          return this.$settings.get('bgm');
        }
      },
      version: {
        get() {
          return config.version;
        }
      }
    },
    methods: {
      doDisplayMenu() {
        if (!this.displayMenu) {
          this.$sound.tap();
          this.displayMenu = true;
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
