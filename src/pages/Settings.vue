<template>
  <q-page>
    <transition appear appear-active-class="animated bounceInDown">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-auto">
            <q-btn round color="primary"
                   icon="mdi-chevron-left"
                   @click="$sound.tap(), goBack()"/>
          </div>
          <div class="col-12">
            <div class="q-gutter-xs">
              <q-btn class="full-width" color="primary"
                     :label="'清除所有数据'" @click="$sound.tap()" />
              <div class="text-caption text-grey">
                在播放器出现异常时，可以尝试清除所有数据来恢复。
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
  export default {
    name: "Settings",
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
