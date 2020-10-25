<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawer"
              :width="280"
              :breakpoint="599"
              bordered
              show-if-above
              content-class="bg-grey-3">
      <div class="q-pa-md text-h6">
        <div class="row q-col-gutter-sm items-center">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$router.push('/')" size="sm"/>
          </div>
          <div class="col">
            BanG Player Wiki
          </div>
        </div>
      </div>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="(item, key) in content[this.$i18n.locale]"
                  :key="key"
                  v-ripple
                  clickable
                  @click="changeContent(key)">
            <q-item-section>
              <q-item-label v-html="item.trim().split('\n')[0].replace(/<\/?.+?>/g,'')"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page class="bg-grey-1" v-if="!loading">
        <div class="container">
          <div class="row q-col-gutter-md">
            <div class="col-12" v-html="currentContent" v-if="currentContent"/>
            <div class="col-12 text-bold text-center" v-else>
              {{ $t('Network Error') }}
            </div>
          </div>
        </div>
        <q-page-sticky position="bottom-left" :offset="[12, 12]">
          <q-btn flat round unelevated color="primary"
                 icon="mdi-menu"
                 @click="drawer = !drawer"/>
        </q-page-sticky>
      </q-page>
      <q-page class="sgm flex flex-center" v-else>
        <div>
          <q-spinner/>
          {{ $t('public.loading') }}
        </div>
        <q-page-sticky position="bottom-left" :offset="[12, 12]">
          <q-btn flat round unelevated color="primary"
                 icon="mdi-menu"
                 @click="drawer = !drawer"/>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import 'src/css/github.css';
  import showdown from 'showdown';

  showdown.setOption('openLinksInNewWindow', true);
  showdown.setOption('tables', true);
  let converter = new showdown.Converter();

  export default {
    name: "Wiki",
    data: () => {
      return {
        drawer: false,
        repoContent: null,
        content: {},
        currentContent: null,
        lang: 'zh-cn',
        loading: false
      };
    },
    methods: {
      markdown(text) {
        return converter.makeHtml(text);
      },
      changeContent(target) {
        this.currentContent = this.content[this.lang][target];
      },
      async getContent(lang) {
        if(!lang) lang = 'zh-cn';
        const createWikiContent = async (langContent) => {
          const wikiContent = {};
          for (const file of langContent) {
            if (file.type === 'file' && file.name.toLowerCase().endsWith('.md')) {
              const name = file.name.substring(0, file.name.length - 3);
              wikiContent[name] = this.markdown(await this.$axios.get(file.download_url));
            }
          }
          return wikiContent;
        }
        for (const item of this.repoContent) {
          if (lang === item.name && item.type === 'dir') {
            const langContent = await this.$github.getContent('ReiKohaku', 'BanG_Player_Wiki', `/${item.name}`);
            return await createWikiContent(langContent);
          }
        }
        return null;
      }
    },
    async mounted() {
      this.$audio.fadeOutPause();
      this.loading = true;
      try {
        this.lang = this.$i18n.locale;
        this.repoContent = await this.$github.getContent('ReiKohaku', 'BanG_Player_Wiki');
        this.content[this.lang] = await this.getContent(this.lang);
        if(!this.content[this.lang]) this.content[this.lang] = await this.getContent();
        this.changeContent('README');
      } catch {
      } finally {
        this.loading = false;
      }
    }
  }
</script>

<style scoped>

</style>
