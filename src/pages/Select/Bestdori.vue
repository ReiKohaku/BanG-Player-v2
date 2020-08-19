<template>
  <q-page>
    <transition appear appear-active-class="animated bounceInDown">
      <div class="container">
        <div class="row q-col-gutter-md items-center">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), $router.push('/')"/>
          </div>
          <div class="col">
            <q-input :label="$t('public.search')" v-model="searchVal" @input="search">
              <template v-slot:append>
                <q-btn flat round icon="mdi-subdirectory-arrow-left" @click="onDirect" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="q-mt-md">
          <q-infinite-scroll ref="infiniteScroll" @load="load">
            <div class="row q-col-gutter-md" v-if="list && list.length > 0">
              <div v-for="item in list"
                   :key="item.id"
                   class="col-xs-12 col-sm-4 col-md-3">
                <transition appear
                            appear-active-class="animated flipInY"
                            leave-active-class="animated flipOutY">
                  <chart-card :info="item"/>
                </transition>
              </div>
            </div>
          </q-infinite-scroll>
        </div>
        <transition appear appear-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div class="text-center q-mt-md" v-show="loading">
            <q-spinner/>
            {{ $t('public.loading') }}
          </div>
        </transition>
      </div>
    </transition>
  </q-page>
</template>

<script>
  import ChartCard from "src/components/Select/ChartCard";
  import {debounce} from 'quasar'
  import Store from "../../store";

  export default {
    name: "Bestdori",
    components: {ChartCard},
    data: function () {
      return {
        loading: false,
        loadPerPull: 12,
        list: [],
        searchVal: ''
      }
    },
    computed: {
      keys: {
        get() {
          if (this.searchVal.length === 0) return [];
          return this.searchVal.split(' ');
        }
      }
    },
    methods: {
      async load(index, done) {
        this.loading = true;
        this.$store.commit('axiosCanceller/doCancel');
        const search = this.searchVal;
        const tags = [];
        const data = await this.$bestdori.getBestdoriChart({
          offset: (index - 1) * 20,
          search, tags
        });
        this.list = this.list.concat(data.list);
        this.loading = false;
        done(data.done);
      },
      search() {
        this.$refs.infiniteScroll.stop();
        this.list = [];
        this.$refs.infiniteScroll.reset();
        this.$refs.infiniteScroll.resume();
        this.$refs.infiniteScroll.trigger();
      },
      onDirect() {
        this.$q.dialog({
          title: this.$t('dialogs.directlyStart.title'),
          message: this.$t('dialogs.directlyStart.message'),
          prompt: {
            model: '',
            type: 'number'
          },
          cancel: true,
          persistent: true
        }).onOk(data => {
          this.$q.loading.show();
          try {
            this.$router.push(`bestdori/${data}`);
          } catch {
          } finally {
            this.$q.loading.hide();
          }
        })
      }
    },
    mounted() {
      this.search = debounce(this.search, 1500);
    }
  }
</script>

<style scoped>

</style>
