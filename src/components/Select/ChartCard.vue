<template>
  <div>
    <q-card class="card-hoverable shadow-transition cursor-pointer sgm"
            style="margin-top: 8px" @click="$sound.tap(), toInfo()">
      <div class="relative-position">
        <q-img :ratio="1"
               :src="$settings.usePreferProxyUrl((typeof info.cover === 'object') ? info.cover[jacketIndex] : info.cover)"
               placeholder-src="img/jacket.png"
               transition="fade">
        </q-img>
        <div class="absolute-top absolute-full linear-mask"/>
        <diff-icon-list class="absolute-top-left"
                        style="margin: -8px 12px 12px 12px"
                        :diffs="info.difficulty"
                        :size="32" shape="rect"/>
        <q-btn icon="swap_horiz"
               round color="primary"
               class="absolute-top-left"
               style="margin: 30px -12px"
               v-show="info.cover.length > 1"
               v-if="typeof info.cover === 'object'"
               @click="jacketIndex = (jacketIndex === info.cover.length - 1) ? 0 : (jacketIndex + 1)"/>
        <div class="absolute-bottom-left" style="margin: 12px; width: 100%;">
          <div class="row q-gutter-xs items-center ellipsis" v-if="!official">
            <div class="col">
              <div class="text-caption text-white ellipsis" style="margin-right: 24px;">
                {{ info.author }}
              </div>
            </div>
          </div>
          <div class="text-h6 text-white ellipsis"
               style="margin: 0px 16px 0px 0px">
            {{ $lang.getInLang($i18n.locale, info.title) }}
          </div>
          <div class="text-subtitle2 text-white ellipsis"
               style="margin: 0px 16px 0px 0px">
            {{ $lang.getInLang($i18n.locale, info.artist) }}
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
  import DiffIconList from "src/components/Select/DiffIconList";

  export default {
    name: "ChartCard",
    components: {DiffIconList},
    props: {
      info: {
        type: Object,
        required: true
      },
      official: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        jacketIndex: 0
      };
    },
    methods: {
      async toInfo() {
        this.$q.loading.show();
        this.$store.commit('chartInfo/updateChartInfo', this.info);
        await this.$router.push('info');
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }

  .linear-mask {
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0.8)));
  }

  .linear-mask:hover {
    -webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0.6)));
  }
</style>
