<template>
  <div class="q-pa-sm" style="border: 3px dashed grey; border-radius: 5px">
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 text-h6">{{ title }}</div>
      <div class="col-xs-12">
        <q-img :src="src"/>
      </div>
      <div class="col-xs-12">
        <q-btn class="full-width" color="primary" no-caps
               :disable="src === ''" :label="reset" @click="imgSrc = '', onChangeEvent()"/>
      </div>
      <div class="col-xs-12">
        <q-tabs v-model="tab">
          <q-tab icon="mdi-file" name="base64"/>
          <q-tab icon="mdi-network" name="url"/>
        </q-tabs>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="base64">
            <q-btn class="full-width" no-caps :label="label" @click="changeFile"/>
            <input type="file"
                   ref="fileInput"
                   accept="image/*"
                   style="display: none"
                   @change="onFileChangeEvent"/>
          </q-tab-panel>
          <q-tab-panel name="url">
            <q-input v-model="imgSrc" @input="onChangeEvent()"/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
  //图片选择器，因为之前直接放在设置里面太影响打开速度了……所以重整一个

  export default {
    name: "ImageSelector",
    data: function () {
      return {
        tab: this.isBase64(this.src) ? 'base64' : 'url',
        imgSrc: this.src,
        base64Temp: this.src
      };
    },
    props: {
      src: String,
      label: String,
      reset: String,
      title: String
    },
    model: {
      prop: 'src',
      event: 'onChangeEvent'
    },
    watch: {
      tab(newVal, oldVal) {
        //切换面板时，如果发现src是base64编码，则隐藏编码以加快载入速度，提升用户体验
        if (newVal === 'url' && this.isBase64(this.imgSrc)) {
          this.base64Temp = this.imgSrc;
          this.imgSrc = '';
        } else if (newVal === 'base64' && this.imgSrc.length === 0) {
          this.imgSrc = this.base64Temp;
        }
      }
    },
    computed: {
      isSrcBase64() {
        return this.isBase64(this.imgSrc);
      }
    },
    methods: {
      onChangeEvent() {
        this.$emit('onChangeEvent', this.imgSrc);
      },
      isBase64(str) {
        if (str.indexOf('data:') != -1 && str.indexOf('base64') != -1) {
          return true;
        } else {
          return false;
        }
      },
      changeFile() {
        this.$refs.fileInput.click();
      },
      async onFileChangeEvent(e) {
        let url = await this.$file.readFile(e.target.files[0], 'dataurl');
        this.imgSrc = url;
        this.onChangeEvent();
      }
    }
  }
</script>

<style scoped>

</style>
