<template>
  <q-page>
    <transition appear appear-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">
      <div class="container">
        <div class="row q-col-gutter-md items-center">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), $router.push('/')"/>
          </div>
          <div class="col-12">
            <div>
              <q-btn no-caps
                     color="primary"
                     class="full-width"
                     icon="mdi-check-double"
                     :label="$t('notification.markAllAsRead')"
                     :disable="!$store.getters['notification/hasNew']"
                     @click="$store.commit('notification/setRead', notification)"/>
            </div>
          </div>
          <div class="col-12">
            <q-list bordered class="rounded-borders">
              <q-expansion-item v-for="item in notification"
                                :key="item.key"
                                :class="`bg-white ${readList.includes(item.key) ? 'text-black' : 'text-red'}`"
                                expand-separator
                                :label="getPreferLang(item).title"
                                :caption="new Date(item.time).toLocaleString()">
                <q-card>
                  <q-card-section>
                    <div class="text-black" v-html="markdown(getPreferLang(item).content)"/>
                  </q-card-section>
                  <q-btn no-caps
                         flat
                         class="full-width text-black"
                         icon="mdi-check"
                         :label="$t('notification.markAsRead')"
                         @click="$store.commit('notification/setRead', [item])"
                         v-if="!readList.includes(item.key)">
                  </q-btn>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import 'src/css/github.css';
import showdown from 'showdown';
import {LocalStorage} from "quasar";

showdown.setOption('openLinksInNewWindow', true);
let converter = new showdown.Converter();

export default {
  name: "Notification",
  computed: {
    notification: {
      get() {
        return this.$store.state.notification.notification;
      }
    },
    readList: {
      get() {
        return this.$store.state.notification.readList;
      }
    }
  },
  methods: {
    markdown(text) {
      return converter.makeHtml(text);
    },
    getPreferLang(item) {
      if (item[this.$i18n.locale]) return item[this.$i18n.locale];
      else if (item['en-us']) return item['en-us'];
      else return item['zh-cn'];
    }
  },
  async mounted() {
  }
}
</script>

<style scoped>

</style>
