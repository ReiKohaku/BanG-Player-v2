<template>
  <q-dialog v-model="display_" persistent>
    <q-card style="width: 75%; min-width: 300px">
      <q-card-section>
        <div class="row">
          <div class="text-h6" v-if="downloadDialog.title">{{ downloadDialog.title }}</div>
          <q-space/>
          <q-btn round flat icon="mdi-close" v-close-popup v-if="downloadDialog.closeable" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <div class="text-body1 text-center" v-if="downloadDialog.message">{{ downloadDialog.message }}</div>
          </div>
          <div class="col-12">
            <download-progress />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import DownloadProgress from "./DownloadProgress";
  export default {
    name: "DownloadDialog",
    components: {DownloadProgress},
    props: {
      display: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        display_: this.display
      };
    },
    model: {
      prop: 'display',
      event: 'updateDisplay'
    },
    watch: {
      display(v) {
        this.display_ = v;
        if(!v) this.$store.commit('axiosCanceller/doCancel');
      },
      display_(v) {
        this.$emit('updateDisplay', v);
        if(!v) this.$store.commit('axiosCanceller/doCancel');
      },
      'downloadDialog.display'(v) {
        this.display_ = v;
      }
    },
    computed: {
      downloadDialog: {
        get() {
          return this.$store.state.downloadDialog.downloadDialog;
        }
      }
    }
  }
</script>

<style scoped>

</style>
