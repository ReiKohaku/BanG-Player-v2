<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-linear-progress :value="downloadInfo.currentSize / downloadInfo.totalSize"
                           :indeterminate="(downloadInfo.totalSize && downloadInfo.totalSize > 0) ? false : true"
                           color="primary"/>
      </div>
      <div class="col-12 text-center text-body1">
        {{ `${humanStorageSize(downloadInfo.currentSize)}/${humanStorageSize(downloadInfo.totalSize)}` }}
      </div>
      <div class="col-12 text-center text-caption text-grey">
        {{ `${humanStorageSize(downloadInfo.downloadSpeed)}/s` }}
      </div>
    </div>
  </div>
</template>

<script>
  import {format} from 'quasar'

  const {humanStorageSize} = format
  export default {
    name: "DownloadProgress",
    data: function () {
      return {
      };
    },
    computed: {
      downloadInfo: {
        get() {
          return this.$store.state.downloadInfo;
        }
      }
    },
    methods: {
      humanStorageSize
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
