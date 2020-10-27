<template>
  <q-page>
    <transition appear appear-active-class="animated bounceInDown">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), $router.push('/')"/>
          </div>
          <div class="col-12">
            <q-card>
              <q-tabs v-model="tab" no-caps>
                <q-tab name="bangpack" :label="$t('local.bangpack.title')"/>
                <q-tab name="auto" :label="$t('local.auto.title')"/>
              </q-tabs>
              <q-tab-panels v-model="tab">
                <q-tab-panel name="bangpack">
                  <div class="q-pa-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-btn color="primary"
                               class="full-width"
                               no-caps
                               :label="$t('local.bangpack.select')"
                               @click="selectBanGPack"/>
                        <input type="file"
                               ref="banGPackInput"
                               accept=".bangpack, application/zip"
                               style="display: none"
                               @change="onBanGPackSelected"/>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="auto">
                  <div class="q-pa-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-input type="textarea" v-model="autoChartData" dense/>
                      </div>
                      <div class="col-12">
                        <q-btn color="primary"
                               class="full-width"
                               no-caps
                               :label="$t('local.auto.select')"
                               @click="selectChart"
                               dense/>
                        <input type="file"
                               ref="chartInput"
                               accept="application/json"
                               style="display: none"
                               @change="onChartSelected"/>
                      </div>
                      <div class="col-12">
                        <q-file :label="$t('local.auto.chartAudio')"
                                :value="auto.audio"
                                @input="onAudioSelected"
                                accept="audio/*"
                                dense/>
                      </div>
                      <div class="col-12">
                        <q-file :label="$t('local.auto.chartCover')"
                                :value="auto.cover"
                                @input="onCoverSelected"
                                accept="image/*"
                                dense/>
                      </div>
                      <div class="col-12">
                        <q-input :label="$t('local.auto.chartTitle')"
                                 v-model="auto.title"
                                 dense/>
                      </div>
                      <div class="col-12">
                        <q-input :label="$t('local.auto.chartArtist')"
                                 v-model="auto.artist"
                                 dense/>
                      </div>
                      <div class="col-12">
                        <q-input :label="$t('local.auto.chartAuthor')"
                                 v-model="auto.author"
                                 dense/>
                      </div>
                      <div class="col-12">
                        <q-btn-toggle v-model="auto.difficulty[0].type"
                                      color="white"
                                      text-color="black"
                                      :toggle-color="auto.difficulty[0].type"
                                      :options="difficulties"
                                      spread
                                      no-caps/>
                      </div>
                      <div class="col-12">
                        <q-slider v-model="auto.difficulty[0].level"
                                  :min="5"
                                  :max="30"
                                  :step="1"
                                  label
                                  :label-value="auto.difficulty[0].level"
                                  label-always/>
                      </div>
                      <div class="col-12">
                        <q-btn class="full-width" color="primary"
                               :label="$t('local.auto.load')"
                               :disable="!isFull" @click="doSubmit"/>
                      </div>
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
  import JSZip from 'jszip';
  import {format} from "quasar";

  const {capitalize} = format;

  const diffName = ['easy', 'normal', 'hard', 'expert', 'special'];
  const difficulties = [];
  for (const i of diffName) {
    difficulties.push({
      label: capitalize(i),
      value: i
    })
  }

  export default {
    name: "Local",
    data: () => {
      return {
        tab: 'bangpack',
        auto: {
          audio: null,
          cover: null,
          title: null,
          artist: null,
          author: null,
          difficulty: [
            {
              type: 'expert',
              level: 20
            }
          ]
        },
        autoChartData: '',
        difficulties
      };
    },
    computed: {
      isFull: {
        get() {
          if (this.autoChartData.length <= 0) return false;
          else if (!this.auto.audio) return false;
          else return true;
        }
      }
    },
    methods: {
      selectBanGPack() {
        this.$refs.banGPackInput.click();
      },
      async onBanGPackSelected(e) {
        this.$q.loading.show();
        try {
          const file = e.target.files[0];
          const zip = new JSZip();
          let audio, cover, chart;
          await zip.loadAsync(file).then(async function (file) {
            await zip.file('audio').async('blob').then(content => audio = content);
            await zip.file('cover').async('blob').then(content => cover = content);
            await zip.file('chart.json').async('text')
              .then(function (content) {
                chart = JSON.parse(content);
              });
          });
          const chartInfo = chart.chartInfo;
          chartInfo.type = 'bangpack';
          // chartInfo.audio = await this.$file.readFile(audio, 'dataurl');
          // chartInfo.audio = chartInfo.audio.replace('data:application/octet-stream', 'data:audio/mp3');
          chartInfo.audio = window.URL.createObjectURL(audio);
          // chartInfo.cover = await this.$file.readFile(cover, 'dataurl');
          chartInfo.cover = window.URL.createObjectURL(cover);
          this.$store.commit('chartInfo/updateChartInfo', chartInfo);
          this.$store.commit('chartInfo/updateChartData', chart.chartData);
          await this.$router.push('/info');
        } catch (e) {
          this.$q.notify({
            message: this.$t('public.error'),
            caption: e.message,
            icon: 'mdi-close'
          })
        }
        this.$q.loading.hide();
      },
      selectChart() {
        this.$refs.chartInput.click();
      },
      async onChartSelected(e) {
        try {
          const chart = await this.$file.readFile(e.target.files[0]);
          this.autoChartData = chart;
        } catch (e) {
          this.$q.notify({
            message: this.$t('public.error'),
            caption: e.message,
            icon: 'mdi-close'
          })
        }
      },
      onAudioSelected(event) {
        this.auto.audio = event;
      },
      onCoverSelected(event) {
        this.auto.cover = event;
      },
      async doSubmit() {
        this.$q.loading.show();
        try {
          const chartInfo = {
            type: 'auto',
            ...this.auto
          };
          const chartData = {};
          chartInfo.cover = chartInfo.cover || 'img/jacket.png';
          chartInfo.title = chartInfo.title || this.$t('local.auto.defaultTitle');
          chartInfo.artist = chartInfo.artist || this.$t('local.auto.defaultArtist');
          chartInfo.author = chartInfo.author || this.$t('local.auto.defaultAuthor');
          chartData[chartInfo.difficulty[0].type] = JSON.parse(this.autoChartData);
          // chartInfo.audio = await this.$file.readFile(chartInfo.audio, 'dataurl');
          chartInfo.audio = window.URL.createObjectURL(chartInfo.audio);
          if(typeof chartInfo.cover === 'string') {
            const coverFile = new Blob([await this.$file.getFile(chartInfo.cover)]);
            // chartInfo.cover = await this.$file.readFile(coverFile, 'dataurl');
            chartInfo.cover = window.URL.createObjectURL(coverFile);
          } else chartInfo.cover = window.URL.createObjectURL(chartInfo.cover);
          //else chartInfo.cover = await this.$file.readFile(chartInfo.cover, 'dataurl');
          this.$store.commit('chartInfo/updateChartInfo', chartInfo);
          this.$store.commit('chartInfo/updateChartData', chartData);
          await this.$router.push('/info');
        } catch(e) {
          // console.log(e);
        }
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>

</style>
