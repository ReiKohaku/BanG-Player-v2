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
          <q-infinite-scroll ref="infiniteScroll" @load="load" v-if="fullList">
            <div class="row q-col-gutter-md" v-if="list && list.length > 0">
              <div v-for="item in list"
                   :key="item.id"
                   class="col-xs-12 col-sm-4 col-md-3">
                <transition appear
                            appear-active-class="animated flipInY"
                            leave-active-class="animated flipOutY">
                  <chart-card :info="item" :official="true"/>
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

  export default {
    name: "Official",
    components: {ChartCard},
    data: function () {
      return {
        loading: false,
        loadPerPull: 20,
        list: [],
        fullList: null,
        searchList: null,
        searchVal: ''
      }
    },
    computed: {
      keys: {
        get() {
          if (this.searchVal === '') return null;
          return this.searchVal.split(' ');
        }
      }
    },
    methods: {
      load(index, done) {
        this.loading = true;
        // 获取部分搜索结果列表 开始
        let start = (index - 1) * this.loadPerPull;
        let count = this.loadPerPull;
        let isDone = false;
        if (start + count >= this.searchList.length - 1) {
          count = this.searchList.length - start;
          isDone = true;
        }
        const newList = this.searchList.concat().splice(start, count);
        // 获取部分搜索结果列表 结束
        this.list = this.list.concat(newList);
        this.loading = false;
        done(isDone);
      },
      search() {
        this.$refs.infiniteScroll.stop();
        this.list = [];
        // 刷新搜索结果列表 开始
        this.searchList = [];
        if (!this.keys || this.keys.length === 0) this.searchList = this.fullList.concat();
        else {
          this.fullList.forEach(item => {
            let add = true;
            for (const i in this.keys) {
              if (!this.deepSearch({
                id: item.id,
                title: item.title,
                artist: item.artist
              }, this.keys[i])) add = false;
            }
            if (add) this.searchList.push(item);
          })
        }
        // 刷新搜索结果列表 结束
        this.$refs.infiniteScroll.reset();
        this.$refs.infiniteScroll.resume();
        this.$refs.infiniteScroll.trigger();
      },
      deepSearch(item, key) {
        if (!item) return false;
        else if (typeof item === 'string' && item.toLowerCase().includes(key.toLowerCase())) return true;
        else if (typeof item === 'number' && item === Number.parseInt(key)) return true;
        else if (typeof item === 'object') {
          for (const i in item) {
            if (this.deepSearch(item[i], key)) return true;
          }
        } else return false;
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
            this.$router.push(`official/${data}`);
          } catch {
          } finally {
            this.$q.loading.hide();
          }
        })
      }
    },
    async mounted() {
      this.search = debounce(this.search, 1500);
      this.loading = true;
      this.fullList = await this.$bestdori.getOfficialSongList();
      this.searchList = this.fullList.concat();
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
