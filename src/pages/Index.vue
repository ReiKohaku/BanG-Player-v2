<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row q-col-gutter-md">
        <transition appear
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
          <div class="col-xs-12 col-sm-6 col-md-8 self-center text-center sgm">
            <div class="text-h3">BanG Player</div>
            <div class="text-body1">{{ $t('index.subtitle') }}</div>
          </div>
        </transition>
        <div class="col-xs-12 col-sm-6 col-md-4 txjlcyj">
          <div class="col-xs-12">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInRight">
                  <q-btn color="primary" class="full-width"
                         :label="$t('btns.LABEL_OFFICIAL')" @click="doPush('official')"/>
                </transition>
              </div>
              <div class="col-12">
                <transition appear appear-active-class="animated fadeInRight">
                  <q-btn color="secondary" class="full-width"
                         :label="$t('btns.LABEL_BESTDORI')" @click="doPush('bestdori')"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInRight">
                  <q-btn color="primary" class="full-width"
                         :label="$t('btns.LABEL_LOCAL')" :disable="true"/>
                </transition>
              </div>
              <div class="col-6">
                <transition appear appear-active-class="animated fadeInRight">
                  <q-btn color="primary" class="full-width"
                         :label="$t('btns.LABEL_SETTINGS')" @click="doPush('settings')"/>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'PageIndex',
    methods: {
      async doPush(target) {
        this.$sound.tap();
        this.$q.loading.show();
        await this.$router.push(target);
        this.$q.loading.hide();
      }
    }
  }
</script>
