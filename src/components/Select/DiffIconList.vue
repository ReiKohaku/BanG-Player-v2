<template>
  <div>
    <div :class="`row q-gutter-${gutter} justify-center`">
      <div v-for="(item, index) in diffList" :key="index">
        <span :class="`text-white ${shape.toLowerCase() === 'rect' ? 'diff-rect' : 'diff-circle'} bg-${item.type.toLowerCase()} shadow-${shadow}`"
              :style="spanStyle"
              round> {{ item.level }}</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DiffIconList',
    props: {
      diffs: {
        required: true
      },
      size: {
        default: 36
      },
      textSize: {
        default: '1em'
      },
      shadow: {
        type: Number,
        default: 8
      },
      gutter: {
        type: String,
        default: 'sm'
      },
      shape: {
        type: String,
        default: 'circle'
      }
    },
    data: function () {
      return {
        diffName: ['easy', 'normal', 'hard', 'expert', 'special']
      };
    },
    computed: {
      spanStyle () {
        return {
          width: (typeof this.size === 'number') ? `${this.size}px` : this.size,
          height: (typeof this.size === 'number') ? `${this.size}px` : this.size,
          lineHeight: (typeof this.size === 'number') ? `${this.size}px` : this.size,
          fontSize: (typeof this.textSize === 'number') ? `${this.textSize}px` : this.textSize
        };
      },
      diffList: {
        get () {
          if (typeof this.diffs[0] === 'number') {
            const list = [];
            for (const i in this.diffs) {
              if (this.diffs[i] > 0) {
                list.push({
                  type: this.diffName[i],
                  level: this.diffs[i]
                });
              }
            }
            return list;
          } else return this.diffs;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .diff-rect
    display inline-block
    text-align center

  .diff-circle
    display inline-block
    border-radius 50%
    text-align center
</style>
