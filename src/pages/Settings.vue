<template>
  <q-page v-if="settings">
    <transition appear appear-active-class="animated bounceInDown">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), goBack()"/>
          </div>
          <div class="col-12">
            <div class="q-gutter-xs">
              <q-btn class="full-width" color="primary" no-caps
                     :label="$t('btns.LABEL_CLEAR')" @click="$sound.tap(), clear()"/>
              <div class="text-caption text-grey">
                {{ $t('btns.HINT_CLEAR') }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-card>
              <q-tabs v-model="tab"
                      active-color="primary"
                      indicator-color="primary"
                      align="justify"
                      narrow-indicator>
                <q-tab name="live" :label="$t('settings.live.title')"/>
                <q-tab name="effect" :label="$t('settings.effect.title')"/>
                <q-tab name="others" :label="$t('settings.others.title')"/>
              </q-tabs>
              <q-tab-panels v-model="tab">
                <q-tab-panel name="live">
                  <div class="row q-col-gutter-md items-center">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.speed"
                                      :label="$t('settings.live.speed')"
                                      :minValue="1.0"
                                      :maxValue="11.0"
                                      :smallStep="0.1"
                                      :bigStep="0.5"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.noteScale"
                                      :label="$t('settings.live.noteScale')"
                                      :displayValue="`${Math.round(settings.gameConfig.noteScale * 100)}%`"
                                      :minValue="0.1"
                                      :maxValue="2.0"
                                      :smallStep="0.1"
                                      type="small"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.judgeOffset"
                                      :label="$t('settings.live.judgeOffset')"
                                      :minValue="-480"
                                      :maxValue="480"
                                      :smallStep="1"
                                      :bigStep="5"
                                      type="smallBig"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.visualOffset"
                                      :label="$t('settings.live.visualOffset')"
                                      :minValue="-480"
                                      :maxValue="480"
                                      :smallStep="1"
                                      :bigStep="5"
                                      type="smallBig"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.barOpacity"
                                      :label="$t('settings.live.barOpacity')"
                                      :displayValue="`${Math.round(settings.gameConfig.barOpacity * 100)}%`"
                                      :minValue="0.1"
                                      :maxValue="1.0"
                                      :smallStep="0.1"
                                      type="small"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <number-stepper v-model="settings.gameConfig.backgroundDim"
                                      :label="$t('settings.live.backgroundDim')"
                                      :displayValue="`${Math.round(settings.gameConfig.backgroundDim * 100)}%`"
                                      :minValue="0.1"
                                      :maxValue="1.0"
                                      :smallStep="0.1"
                                      type="small"
                                      :cycle="true"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.showSimLine')" v-model="settings.gameConfig.showSimLine"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.beatNote')" v-model="settings.gameConfig.beatNote"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.mirror')" v-model="settings.gameConfig.mirror"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.laneEffect')" v-model="settings.gameConfig.laneEffect"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.autoFullscreen')" v-model="settings.autoFullscreen"/>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-toggle :label="$t('settings.live.upperHidden')" v-model="settings.upperHidden"/>
                    </div>
                    <div class="col-12" v-show="settings.upperHidden">
                      <image-selector v-model="settings.upperHiddenImg"
                                      :title="$t('settings.live.upperHidden')"
                                      :label="$t('btns.LABEL_SELECT_A_IMAGE')"
                                      :reset="$t('btns.LABEL_RESET_IMAGE')"/>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="effect">
                  <div class="row q-col-gutter-md items-center">
                    <div class="col-12">
                      <div class="row q-col-gutter-sm">
                        <div class="col-12">{{$t('settings.live.resolution')}}</div>
                        <div class="col-12">
                          <q-slider v-model="settings.gameConfig.resolution" :min="0.4" :max="4" :step="0.05" label/>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <q-select v-model="settings.skin"
                                :options="skinList"
                                :label="$t('settings.effect.skin')"
                                emit-value
                                map-options/>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <q-select v-model="settings.bg"
                                :options="backgroundList"
                                :label="$t('settings.effect.bg')"
                                emit-value
                                map-options/>
                    </div>
                    <div class="col-12" v-show="settings.bg === 'custom'">
                      <image-selector v-model="settings.customBg"
                                      :title="$t('settings.effect.bg')"
                                      :label="$t('btns.LABEL_SELECT_A_IMAGE')"
                                      :reset="$t('btns.LABEL_RESET_IMAGE')"/>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <q-select v-model="settings.sound"
                                :options="soundList"
                                :label="$t('settings.effect.sound')"
                                emit-value
                                map-options/>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                      <q-btn class="full-width"
                             icon="play_arrow"
                             :label="$t('settings.effect.perfect')" no-caps
                             @click="$sound.perfect($settings.getSoundName())" />
                    </div>
                    <div class="col-xs-6 col-sm-3">
                      <q-btn class="full-width"
                             icon="play_arrow"
                             :label="$t('settings.effect.flick')" no-caps
                             @click="$sound.flick($settings.getSoundName())" />
                    </div>
                    <div class="col-12">
                      <div class="row q-col-gutter-sm">
                        <div class="col-12">{{ $t('settings.effect.effectVolume') }}</div>
                        <div class="col-12">
                          <q-slider v-model="settings.gameConfig.effectVolume" :min="0" :max="1" :step="0.01"
                                    label
                                    :label-value="`${Math.floor(settings.gameConfig.effectVolume * 100)}%`"/>
                      </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="others">
                  <div class="row q-col-gutter-md items-center">
                    <div class="col-12">
                      <div class="row q-col-gutter-sm">
                        <div class="col-12">{{$t('settings.others.bgm')}}</div>
                        <div class="col-12">
                          {{`${$lang.getInLang($i18n.locale, settings.bgm.artist)} - ${$lang.getInLang($i18n.locale, settings.bgm.title)}`}}
                        </div>
                        <div class="col-12">
                          <q-btn class="full-width"
                                 color="primary"
                                 dense
                                 no-caps
                                 :label="$t('settings.others.resetBgm')" @click="onResetBgm"/>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <q-select v-model="settings.language"
                                :options="languageList"
                                :label="$t('settings.others.language')"
                                emit-value
                                map-options/>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <q-select v-model="settings.proxy"
                                :options="proxyList"
                                :label="$t('settings.others.proxy')"
                                emit-value
                                map-options/>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
  import NumberStepper from "src/components/Component/Settings/NumberStepper";
  import ImageSelector from "src/components/Component/Settings/ImageSelector";

  export default {
    name: "Settings",
    components: {ImageSelector, NumberStepper},
    data: function () {
      return {
        tab: 'live',
        settings: null
      };
    },
    watch: {
      settings: {
        handler: function (val, oldVal) {
          this.$store.commit('settings/updateSettings', val);
        },
        deep: true
      },
      'settings.language': {
        handler: function (val) {
          this.$i18n.locale = val;
          try {
            import(`quasar/lang/${this.$settings.langIsoList[val] || val}.js`
              ).then(lang => {
              this.$q.lang.set(lang.default)
            })
          } catch {}
        }
      }
    },
    computed: {
      skinList: {
        get () {
          let list = [];
          this.$settings.skinList.forEach(item => {
            list.push({
              label: this.$t(`settings.skins.${item}`),
              value: item
            })
          });
          return list;
        }
      },
      soundList: {
        get () {
          let list = [];
          this.$settings.soundList.forEach(item => {
            list.push({
              label: this.$t(`settings.skins.${item}`),
              value: item
            })
          });
          return list;
        }
      },
      backgroundList: {
        get () {
          let list = [];
          this.$settings.backgroundList.forEach(item => {
            list.push({
              label: this.$t(`settings.skins.${item}`),
              value: item
            })
          });
          return list;
        }
      },
      languageList: {
        get () {
          let list = [];
          this.$settings.languageList.forEach(item => {
            list.push({
              label: this.$settings.languageName[item],
              value: item
            })
          });
          return list;
        }
      },
      proxyList: {
        get () {
          let list = [];
          this.$settings.proxyList.forEach(item => {
            list.push({
              label: this.$t(`settings.proxys.${item.label}`),
              value: item
            })
          });
          return list;
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      clear() {
        const that = this;
        this.$q.dialog({
          title: this.$t('btns.LABEL_CLEAR'),
          message: this.$t('settings.clearConfirm'),
          cancel: true,
          persistent: true
        }).onOk(() => {
          that.$q.localStorage.remove('settings');
          that.$q.localStorage.remove('notification');
          that.$q.localStorage.remove('favorite');
          that.$q.localStorage.remove('history');
          that.$q.localStorage.remove('upperHiddenBoard');
          this.$router.go(0);
        })
      },
      onResetBgm() {
        this.settings.bgm = {
          src: 'sound/bgm/before_live.mp3',
          cover: 'img/before_live.jpg',
          title: 'ライブしよう!',
          artist: 'BanG Dream!',
          offset: 0,
          timePoints: [{bpm: 140, time: 0}]
        };
        this.$audio.fadeOutPause(() => {
          this.$audio.setDefaultAudio();
          this.$audio.play();
        });
      }
    },
    mounted() {
      this.settings = this.$store.getters['settings/settings'];
    }
  }
</script>

<style scoped>

</style>
