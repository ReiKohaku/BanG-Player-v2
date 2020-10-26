<template>
  <div>
    <div class="relative-position" :style="`width: ${realSize}; height: ${realSize}`">
      <div ref="wave"
           class="absolute-top-left"
           :style="`border: ${realWaveWidth} solid ${waveColor}; border-radius: 50%; height: ${realSize}; width: ${realSize}`"/>
      <div ref="title">
        <q-img :src="src"
               class="relative-position"
               :placeholder-src="src"
               :style="`width: ${realSize}; height: ${realSize};`">
          <template v-slot:loading>
            <div/>
          </template>
          <div class="absolute-center" style="background: rgba(0, 0, 0, 0)">
            <slot name="center"/>
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>
<!--#FFA4CF-->
<script>
export default {
  name: "MusicCircle",
  props: {
    src: {
      type: String
    },
    size: {
      default: '64px'
    },
    waveWidth: {
      default: '10px'
    },
    waveColor: {
      type: String,
      default: 'primary'
    },
    time: {
      default: 0
    },
    timePoints: {
      type: Array
    },
    offset: {
      type: Number,
      default: 0
    },
    maxScale: {
      type: Number,
      default: 1.05
    },
    waveMaxScale: {
      type: Number,
      default: 1.05
    }
  },
  data: function () {
    return {
      actionTimer: null,
      realTime: (typeof this.realTime === 'function') ? this.time() : this.time
    };
  },
  computed: {
    realSize: {
      get() {
        return this.propToSize(this.size);
      }
    },
    realWaveWidth: {
      get() {
        return this.propToSize(this.waveWidth);
      }
    }
  },
  methods: {
    propToSize(prop) {
      if (typeof prop === 'number') return `${prop}px`;
      else if (typeof prop === 'string') {
        switch (prop) {
          case 'xs':
            return '16px';
          case 'sm':
            return '24px';
          case 'md':
            return '32px';
          case 'lg':
            return '48px';
          case 'xl':
            return '64px';
          default:
            return prop;
        }
      } else return '64px'
    },
    currentTimePoint() {
      if (this.timePoints && this.timePoints.length >= 0) {
        for (const i in this.timePoints) {
          let index = Number.parseInt(i);
          if (this.realTime >= this.timePoints[index].time && (!this.timePoints[index + 1] || this.realTime < this.timePoints[index + 1].time)) {
            return {
              time: 0,
              bpm: 0,
              ...this.timePoints[index]
            };
          }
        }
      }
      return {
        time: 0,
        bpm: 0,
        ...this.timePoints[0]
      };
    }
  },
  mounted() {
    this.actionTimer = setInterval(() => {
      const title = this.$refs.title;
      const wave = this.$refs.wave;
      if (this.time) this.realTime = (typeof this.realTime === 'function') ? this.time() : this.time;
      else this.realTime = 0;
      const time = this.realTime;
      const currentTimePoint = this.currentTimePoint();
      if (title) {
        const scalePower = 1 + ((time + this.offset - currentTimePoint.time) % (60 / currentTimePoint.bpm)) / (60 / currentTimePoint.bpm) * (this.maxScale - 1);
        title.style.transform = `scale(${scalePower}) rotate(${-time * 10}deg)`;
        wave.style.transform = `scale(${scalePower * this.waveMaxScale})`;
        wave.style.opacity = 1 - (scalePower - 1) / (this.maxScale - 1);
      }
    }, 16)
  },
  beforeDestroy() {
    clearInterval(this.actionTimer);
  }
}
</script>

<style scoped>

</style>
