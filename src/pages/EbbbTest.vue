<template>
  <q-page class="flex flex-center">
    <div class="text-h3 sgm" v-if="loading">
      {{ $t('public.loading') }}
    </div>
  </q-page>
</template>

<script>
import Ebbb from 'src/lib/api/ebbbTest.js';

export default {
  name: "EbbbTest",
  data: function () {
    return {
      loading: false
    };
  },
  async mounted() {
    try {
      this.$q.dialog({
        message: this.$t('ebbb.input.message'),
        prompt: {
          model: '',
          type: 'number'
        },
        cancel: true,
        persistent: true
      }).onOk(async id => {
          this.loading = true;
          let chart = await Ebbb.getChartInfo(id);
          console.log(chart);
          if (!chart.chart) {
            this.$q.notify({
              message: this.$t('public.error'),
              caption: this.$t(`ebbb.${chart.error}`),
              icon: 'mdi-clear'
            })
          } else {
            const chartInfo = {
              id,
              type: 'auto',
              title: decodeURI(chart.title),
              artist: this.$t('local.auto.defaultArtist'),
              author: this.$t('ebbb.author'),
              audio: `https://editor.reikohaku.fun/test/get/music?id=${chart.audio}`,
              cover: 'img/jacket.png',
              difficulty: [
                {
                  type: 'expert',
                  level: 0
                }
              ]
            };
            this.$store.commit('chartInfo/updateChartInfo', chartInfo);
            let chartData = JSON.parse(chart.chart);
            const timepoints = [];
            const slides = [];
            const notes = [];
            for (const i in chartData.timepoints) timepoints.push(chartData.timepoints[i]);
            for (const i in chartData.slides) slides.push(chartData.slides[i]);
            for (const i in chartData.notes) notes.push(chartData.notes[i]);
            chartData = {timepoints, slides, notes};
            this.$store.commit('chartInfo/updateChartData', {
              expert: chartData
            });
            await this.$router.push('/info');
          }
        }
      ).onCancel(() => {
        this.$router.go(-1);
      })
    } catch
      (e) {
      this.$router.go(-1);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>
