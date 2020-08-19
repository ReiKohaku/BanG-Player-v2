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
          <div class="col-12">
            <q-card>
              <q-tabs v-model="tab">
                <q-tab :label="$t('favorite.title')" name="favorite" no-caps/>
                <q-tab :label="$t('history.title')" name="history" no-caps/>
              </q-tabs>
              <q-tab-panels v-model="tab">
                <q-tab-panel name="favorite">
                  <q-list v-if="favoriteList && favoriteList.length > 0">
                    <q-slide-item v-for="item in favoriteList"
                                  :key="`${item.type}_${item.id}`"
                                  @right="onFavoriteSlideEvent(item)">
                      <template v-slot:right>
                        <q-icon color="white" name="delete"/>
                      </template>
                      <q-item clickable
                              @click="$sound.tap(), $router.push(`/${item.type}/${item.id}`)">
                        <q-item-section>
                          <q-item-label>{{ $lang.getInLang($i18n.locale, item.artist) }} - {{ $lang.getInLang($i18n.locale,
                            item.title) }}
                          </q-item-label>
                          <q-item-label caption>{{ item.author }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-slide-item>
                  </q-list>
                  <div v-else class="text-center text-grey">
                    {{ $t('public.empty') }}
                  </div>
                </q-tab-panel>
                <q-tab-panel name="history">
                  <q-list v-if="historyList && historyList.length > 0">
                    <q-slide-item v-for="item in historyList"
                                  :key="`${item.type}_${item.id}`"
                                  @right="onHistorySlideEvent(item)">
                      <template v-slot:right>
                        <q-icon color="white" name="delete"/>
                      </template>
                      <q-item clickable
                              @click="$sound.tap(), $router.push(`/${item.type}/${item.id}`)">
                        <q-item-section>
                          <q-item-label>{{ $lang.getInLang($i18n.locale, item.artist) }} - {{ $lang.getInLang($i18n.locale,
                            item.title) }}
                          </q-item-label>
                          <q-item-label caption>{{ item.author }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label>{{ item.playCount }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-slide-item>
                  </q-list>
                  <div v-else class="text-center text-grey">
                    {{ $t('public.empty') }}
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
  export default {
    name: "Favorite",
    data: function () {
      return {
        tab: 'favorite'
      };
    },
    computed: {
      favoriteList: {
        get() {
          return this.$store.state.favorite.favoriteList;
        }
      },
      historyList: {
        get() {
          return this.$store.state.favorite.historyList;
        }
      }
    },
    methods: {
      onFavoriteSlideEvent(item) {
        this.$q.loading.show();
        this.$store.commit('favorite/toggleFavorite', item);
        this.$q.loading.hide();
      },
      onHistorySlideEvent(item) {
        this.$q.loading.show();
        this.$store.commit('favorite/removeHistory', item);
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>

</style>
