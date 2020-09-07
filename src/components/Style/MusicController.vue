<template>
  <div ref="framework">
    <div class="q-pa-sm">
      <div class="row q-col-gutter-md items-center">
        <div class="col-auto">
          <q-img :ratio="1" :src="(typeof cover === 'string') ? cover : cover[0]" style="width: 36px"/>
        </div>
        <div class="col-auto">
          <q-btn round color="white" text-color="primary" size="md"
                 :icon="$audio.paused() ? 'mdi-play' : 'mdi-pause'"
                 @click="$audio.toggle()"/>
        </div>
        <div class="col">
          <div class="row q-col-gutter-sm">
            <div class="col ellipsis">
              {{ `${$lang.getInLang($i18n.locale, artist)} - ${$lang.getInLang($i18n.locale, title)}` }}
            </div>
            <div class="col-auto">
              <q-btn style="margin: -24px 8px 8px 8px"
                     ref="expandController"
                     round
                     color="white"
                     size="sm"
                     text-color="primary"
                     :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-up'"
                     @click="doExpand"/>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-slider dense color="secondary" v-model="progress"
                        :min="0" :max="this.$audio.getPlayer().duration"/>
            </div>
            <div class="col-auto">
              {{ `${toMusicTime(progress)}\\${toMusicTime(this.$audio.getPlayer().duration)}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {format} from 'quasar';

  const {pad} = format;
  export default {
    name: "MusicController",
    data: function () {
      return {
        onUpdate: null,
        currentTime: 0.0,
        cover: 'img/jacket.png',
        title: 'Unknown Song',
        artist: 'Unknown Artist',
        show: true
      };
    },
    computed: {
      progress: {
        get() {
          return this.currentTime;
        },
        set(v) {
          this.$audio.setCurrentTime(v);
        }
      }
    },
    methods: {
      toMusicTime(number) {
        const hour = Math.floor(number / 3600) || 0;
        const minute = Math.floor(number / 60) || 0;
        const second = Math.floor(number % 60) || 0;
        return `${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)}`;
      },
      doExpand() {
        if(this.show) {
          this.$refs.framework.style.height = 0;
          this.$refs.expandController.style['margin-top'] = '-40px';
          this.show = false;
        } else {
          this.$refs.framework.style.height = '';
          this.$refs.expandController.style['margin-top'] = '-24px';
          this.show = true;
        }
      }
    },
    mounted() {
      this.doExpand();
      //嘛……不会响应式设计了……先用一个计时器刷新顶一下吧= =
      this.onUpdate = setInterval(() => {
        this.currentTime = this.$audio.currentTime();
        this.cover = this.$audio.cover ? this.$audio.cover : 'img/jacket.png';
        this.title = this.$audio.title ? this.$audio.title : 'Unknown Song';
        this.artist = this.$audio.artist ? this.$audio.artist : 'Unknown Artist';
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.onUpdate);
    }
  }
</script>

<style scoped>

</style>
