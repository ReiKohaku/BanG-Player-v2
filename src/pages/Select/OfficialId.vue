<template>
  <q-page class="flex flex-center">
    <div class="text-h3 sgm">
      {{ $t('public.loading') }}
    </div>
  </q-page>
</template>

<script>
  import {Bestdori} from "src/lib/api/bestdori";

  export default {
    name: "OfficialId",
    async beforeMount() {
      try {
        const chartInfo = await Bestdori.getOfficialSongInfo(this.$route.params.id);
        this.$store.commit('chartInfo/updateChartInfo', chartInfo);
        await this.$router.push('/info');
      } catch {
        this.$q.notify({
          message: this.$t('public.error'),
          caption: this.$t('ERR_CHART_NOT_EXIST'),
          icon: 'mdi-close'
        })
        await this.$router.push('/official');
      }

    }
  }
</script>

<style scoped>

</style>
