<template>
  <q-page>
    <transition appear appear-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="container sgm">
        <div class="row q-col-gutter-md items-center">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="doGoBack"
                   :disable="loading"/>
          </div>
          <div class="col"/>
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="settings"
                   @click="$sound.tap(), $router.push('/settings')"
                   :disable="loading"/>
          </div>
          <div class="col-12">
            <q-card class="q-pa-md" style="margin-top: 72px;">
              <div class="row q-col-gutter-md">
                <!--封面图和难度展示-->
                <div class="col-xs-12 col-sm-4 col-md-3 text-center"
                     style="margin-top: -72px;">
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <div class="relative-position" style="width: 100%; max-width: 208px; margin: 0 auto">
                        <q-img
                          :src="coverSrc"
                          :ratio="1"
                          class="shadow-12"
                          width="100%"/>
                        <!--<div ref="audioController"
                             class="absolute-bottom-left">
                          <q-btn style="margin: 8px 8px 8px 8px;"
                                 round
                                 color="red"
                                 icon="mdi-music"
                                 size="md"
                                 @click="$sound.tap(), onControllerClick()"
                                 :loading="$audio.state === 'loading'"
                                 :disable="$audio.state === 'loading'">
                            <template v-slot:loading>
                              <q-spinner />
                            </template>
                          </q-btn>
                        </div>-->
                        <q-btn class="absolute-bottom-left"
                               style="margin: 8px 8px 8px 8px;"
                               round
                               color="red"
                               icon="mdi-home"
                               size="md"
                               @click="$sound.tap(), onSetIndexMusic()"
                               :disable="loading || !shareTypeList.includes(chartInfo.type)"/>
                        <q-btn class="absolute-top-left"
                               style="margin: 30px -12px"
                               round
                               icon="swap_horiz"
                               color="primary"
                               v-show="chartInfo.cover.length > 1"
                               v-if="typeof chartInfo.cover === 'object'"
                               @click="coverIndex = (coverIndex === chartInfo.cover.length - 1) ? 0 : (coverIndex + 1)"/>
                        <q-btn class="absolute-bottom-right"
                               style="margin: 8px 8px 8px 8px;"
                               round
                               :icon="isFavorite ? 'favorite' : 'favorite_border'"
                               color="pink"
                               size="md" :style="'transform: rotate(0deg)'"
                               :disable="!shareTypeList.includes(chartInfo.type)"
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
          <div class="col-12" v-if="difficulties && difficulties.length > 1">
            <q-btn-toggle v-model="difficulty"
                          color="white"
                          text-color="black"
                          :toggle-color="difficulty"
                          :options="difficulties"
                          spread
                          no-caps :disable="loading"/>
          </div>
          <div class="col-xs-6 col-sm-4">
            <div>
              <q-btn class="full-width" no-caps color="blue"
                     :label="$t('btns.LABEL_PACK')" icon="mdi-download"
                     @click="doPack" :disable="loading || !packTypeList.includes(chartInfo.type)"/>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4">
            <div>
              <q-btn class="full-width" no-caps color="yellow"
                     :label="$t('btns.LABEL_SHARE')" icon="mdi-share"
                     @click="doShare" :disable="loading || !shareTypeList.includes(chartInfo.type)"/>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div>
              <q-btn class="full-width" no-caps color="green"
                     :label="$t('btns.LABEL_SELECT_MOD')" icon="mdi-pencil"
                     @click="selectMod" :disable="loading"/>
            </div>
          </div>
          <div class="col-12">
            <div>
              <q-btn class="full-width" no-caps :color="difficulty"
                     :label="$t('btns.LABEL_START_GAME')" icon="mdi-music-clef-treble"
                     @click="onStart" :disable="loading" :loading="loading">
                <q-badge :color="modHelperList[mod].color" floating v-if="mod && modHelperList[mod] && mod.length > 0">
                  {{ modHelperList[mod].text }} mod ON
                </q-badge>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import DiffIconList from "src/components/Select/DiffIconList";
import {mapGetters, mapState} from "vuex";
import {toMapContent, toGameLoadConfig} from "src/lib/factory/convert";
import {copyToClipboard, format, exportFile, extend} from 'quasar';
import JSZip from 'jszip';
import Store from "../../store";

const {capitalize} = format;
const packTypeList = ['official', 'bestdori', 'auto'];
const shareTypeList = ['official', 'bestdori'];

export default {
  name: "Info",
  components: {DiffIconList},
  data: function () {
    return {
      coverIndex: 0,
      rotateTimer: null,
      difficulty: null,
      loading: false,
      packTypeList, shareTypeList
    };
  },
  computed: {
    chartInfo: {
      get() {
        return this.$store.state.chartInfo.chartInfo;
      }
    },
    chartData: {
      get() {
        return this.$store.state.chartInfo.chartData;
      }
    },
    coverSrc: {
      get() {
        let url = '';
        if (typeof this.chartInfo.cover === 'object') url = this.chartInfo.cover[this.coverIndex];
        else if (typeof this.chartInfo.cover === 'string') url = this.chartInfo.cover;
        return this.$settings.usePreferProxyUrl(url);
      }
    },
    difficulties: {
      get() {
        let list = [];
        for (const i in this.chartInfo.difficulty) list.push(
          {
            label: capitalize(this.chartInfo.difficulty[i].type),
            value: this.chartInfo.difficulty[i].type
          });
        return list;
      }
    },
    ...mapGetters({
      isFavorite: 'favorite/isFavorite'
    }),
    mod: {
      get() {
        return this.$store.state.mods.mod;
      }
    },
    modHelperList: {
      get() {
        return this.$store.state.mods.modHelperList || [];
      }
    }
  },
  methods: {
    async onStart() {
      this.loading = true;
      this.$sound.tap();
      try {
        let chartData = null;
        if (this.chartInfo.type === 'official')
          chartData = await this.$bestdori.getOfficialChartData(this.chartInfo.id, this.difficulty);
        else if (this.chartInfo.type === 'bestdori')
          chartData = (await this.$bestdori.getCommunityChartData(this.chartInfo.id)).post.chart;
        else if (this.chartInfo.type === 'bangpack' || this.chartInfo.type === 'auto')
          chartData = JSON.parse(JSON.stringify(this.chartData[this.difficulty]));
        else throw new Error('ERR_UNKNOWN_CHART_TYPE');
        let gameLoadConfig = await toGameLoadConfig(this.$store.state.chartInfo.chartInfo, chartData, this.coverIndex);
        this.$store.commit('chartInfo/updateGameLoadConfig', gameLoadConfig);
        if (shareTypeList.includes(this.chartInfo.type)) await this.$store.commit('favorite/addHistory', this.chartInfo);
        this.$audio.fadeOutPause();
        this.$audio.setDisable(true);
        await this.$router.push('/game');
      } catch (e) {
        console.error(e)
        if (e.message !== 'Canceled') this.$q.notify({
          message: this.$t('public.error'),
          caption: this.$t(e.message),
          icon: 'mdi-close'
        })
      } finally {
        this.loading = false;
      }
    },
    async onSetIndexMusic() {
      if (this.$store.state.special.length > 0) {
        this.$q.notify({
          message: this.$i18n.t('public.tip'),
          caption: this.$i18n.t('TIP_FORBIDDEN_CHANGE'),
          icon: 'info'
        });
        return;
      }
      this.$q.loading.show();
      try {
        const timePoints = [], offset = 0;
        let chartData = null;
        switch (this.chartInfo.type) {
          case 'bestdori':
            chartData = (await this.$bestdori.getCommunityChartData(this.chartInfo.id)).post.notes;
            break;
          case 'official':
            chartData = await this.$bestdori.getOfficialChartData(this.chartInfo.id, 'expert');
            break;
          default:
            throw new Error('Unsupported type');
        }
        let lastTimepoint = {
          bpm: 0,
          time: 0,
          beat: 0
        }
        for (const i of chartData) {
          if (i.type.toLowerCase() === 'system' && i.cmd.toLowerCase() === 'bpm') {
            const t = {
              bpm: i.bpm,
              time: ((i.beat - lastTimepoint.beat) * 60 / lastTimepoint.bpm) || 0
            }
            timePoints.push(t);
            lastTimepoint = {
              ...t,
              beat: i.beat
            };
          }
        }
        ;
        const settings = this.$settings.getAll();
        settings.bgm = {
          src: this.chartInfo.audio,
          cover: this.chartInfo.cover,
          title: this.chartInfo.title,
          artist: this.chartInfo.artist,
          offset, timePoints
        };
        this.$store.commit('settings/updateSettings', settings);
        this.$q.notify({
          message: this.$i18n.t('public.success'),
          caption: this.$i18n.t('INFO_SET_INDEX_MUSIC_SUCCESS', [this.$lang.getInLang(this.$i18n.locale, this.chartInfo.title)]),
          icon: 'mdi-check'
        })
      } catch (e) {
        this.$q.notify({
          message: this.$i18n.t('public.error'),
          caption: this.$i18n.t('ERR_SET_INDEX_MUSIC_FAILED', [this.$lang.getInLang(this.$i18n.locale, this.chartInfo.title)]),
          icon: 'mdi-close'
        })
      }
      this.$q.loading.hide();
    },
    setBtnRotate() {
      if (this.$refs.audioController) {
        this.$refs.audioController.style.transform = `rotate(${-this.$audio.currentTime() * 10}deg)`
      }
    },
    toggleFavorite() {
      this.$store.commit('favorite/toggleFavorite', this.chartInfo);
    },
    async doGoBack() {
      this.$sound.tap();
      switch (this.chartInfo.type) {
        case 'bestdori':
          await this.$router.push('/bestdori');
          break;
        case 'official':
          await this.$router.push('/official');
          break;
        case 'local':
          await this.$router.push('/local');
          break;
        default:
          await this.$router.push('/');
      }
    },
    selectMod() {
      this.$q.bottomSheet({
        message: this.$t('mods.title'),
        actions: [
          {
            label: 'None',
            id: 'none',
            icon: 'mdi-cancel'
          },
          {
            label: 'Single Dog',
            id: 'singleDog',
            icon: 'img: img/singleDog.png'
          },
          {
            label: 'Flick Party!',
            id: 'flickParty',
            icon: 'img: img/flickParty.png'
          },
          {
            label: 'All Flick',
            id: 'allFlick',
            icon: 'img: img/allFlick.png'
          }
        ]
      }).onOk(data => {
        this.$store.commit('mods/updateMod', data.id);
      })
    },
    async doPack() {
      this.$store.commit('downloadDialog/update', {display: true});
      this.$store.commit('updateDownloadInfo', {
        startAt: 0, // timestamp
        lastUpdate: 0, //timestamp
        currentSize: 0, //number, Byte(s)
        totalSize: 0, //number, Byte(s)
        totalTime: 0, //number, ms
        downloadSpeed: 0, //number, Byte(s)/s
        averageSpeed: 0, //number, Byte(s)/s
        progress: 0, //number, percentage, 0~1
        finished: false
      });
      try {
        this.$store.commit('downloadDialog/update', {title: this.$t('pack.TITLE_DOWNLOAD_CHART_DATA')});
        const chartData = {};
        if (this.chartInfo.type === 'official') {
          for (const item of this.chartInfo.difficulty) {
            this.$store.commit(
              'downloadDialog/update',
              {message: this.$t('pack.MSG_GETTING_CHART_DATA', [item.type])});
            const content = await this.$bestdori.getOfficialChartData(this.chartInfo.id, item.type);
            chartData[item.type] = toMapContent(this.chartInfo, content);
          }
        } else if (this.chartInfo.type === 'bestdori') {
          for (const item of this.chartInfo.difficulty) {
            this.$store.commit(
              'downloadDialog/update',
              {message: this.$t('pack.MSG_GETTING_CHART_DATA', [item.type])});
            const content = (await this.$bestdori.getCommunityChartData(this.chartInfo.id)).post.notes;
            chartData[item.type] = toMapContent(this.chartInfo, content);
          }
        } else if (this.chartInfo.type === 'auto') {
          for (const item of this.chartInfo.difficulty) {
            chartData[item.type] = toMapContent(this.chartInfo, this.chartData[item.type]);
          }
        } else throw new Error('ERR_UNKNOWN_CHART_TYPE');
        this.$store.commit('downloadDialog/update', {title: this.$t('pack.TITLE_DOWNLOAD_RESOURCES')});
        let packName;
        if (this.chartInfo.type === 'auto') packName = `${this.chartInfo.artist} - ${this.chartInfo.title}.bangpack`;
        else packName = `[${this.chartInfo.id}]${this.$lang.getInLang(this.$i18n.locale, this.chartInfo.artist)} - ${this.$lang.getInLang(this.$i18n.locale, this.chartInfo.title)}.bangpack`;
        const audioSrc = this.$settings.usePreferProxyUrl(this.chartInfo.audio, true);
        const coverSrc = this.$settings.usePreferProxyUrl(typeof this.chartInfo.cover === 'object' ? this.chartInfo.cover[0] : this.chartInfo.cover, true);
        this.$store.commit('downloadDialog/update', {message: this.$t('pack.MSG_GETTING_AUDIO')});
        const audio = await this.$file.getFile(audioSrc);
        this.$store.commit('downloadDialog/update', {message: this.$t('pack.MSG_GETTING_COVER')});
        const cover = await this.$file.getFile(coverSrc);

        let chartInfo;
        chartInfo = extend(true, chartInfo, this.chartInfo);
        this.$delete(chartInfo, 'audio');
        this.$delete(chartInfo, 'cover');

        const zip = new JSZip();
        zip.file('audio', audio, {binary: true});
        zip.file('cover', cover, {binary: true});
        zip.file('chart.json', JSON.stringify({
          chartInfo, chartData
        }));
        await zip.generateAsync({type: "blob"}).then(function (content) {
          exportFile(packName, content, 'application/zip');
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.$store.commit('downloadDialog/clear');
      }
    },
    doShare() {
      const shareLink = `https://bangplayer.live/${this.chartInfo.type}/${this.chartInfo.id}`;
      copyToClipboard(shareLink)
        .then(() => {
          this.$q.notify({
            message: this.$t('public.success'),
            caption: this.$t('INFO_COPY_TO_CLIPBOARD_SUCCESS'),
            icon: 'mdi-check'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('public.failed'),
            caption: this.$t('INFO_COPY_TO_CLIPBOARD_FAILED'),
            icon: 'mdi-close'
          })
          this.$q.dialog({
            title: this.$t('TITLE_COPY_SHARE_LINK'),
            message: `<div class="text-center full-width q-pa-sm" style="border: 3px dashed grey">${shareLink}</div>`,
            html: true
          })
        })
    }
  },
  async mounted() {
    this.difficulty = this.difficulties[this.difficulties.length - 1].value;
    if (this.chartInfo.audio !== this.$settings.get('bgm').src) {
      this.$audio.changeAudioWithFadeOut(this.$settings.usePreferProxyUrl(this.chartInfo.audio), () => {
        // this.rotateTimer = setInterval(this.setBtnRotate, 100);
        this.$audio.cover = this.$settings.usePreferProxyUrl(typeof this.chartInfo.cover === 'object' ? this.chartInfo.cover[0] : this.chartInfo.cover);
        this.$audio.title = this.$lang.getInLang(this.$i18n.locale, this.chartInfo.title);
        this.$audio.artist = this.$lang.getInLang(this.$i18n.locale, this.chartInfo.artist);
      });
    }
    this.$store.commit('favorite/updateFavorite', this.chartInfo);
  },
  async beforeDestroy() {
    this.$store.commit('downloadDialog/clear');
    // if (this.rotateTimer) clearInterval(this.rotateTimer);
    if (this.chartInfo.audio !== this.$settings.get('bgm').src) {
      this.$audio.fadeOutPause(() => {
        this.$audio.setDefaultAudio();
        this.$audio.play();
      });
    }
  }
}
</script>
