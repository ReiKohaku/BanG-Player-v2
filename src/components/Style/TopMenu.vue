<template>
  <q-page-sticky position="bottom-left" :offset="[12, -18]">
    <q-fab color="primary" text-color="white" direction="up" icon="mdi-menu" push>
      <q-fab-action color="secondary" @click="$q.fullscreen.toggle()"
                    :icon="$q.fullscreen.isActive ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"/>
    </q-fab>
  </q-page-sticky>
</template>

<script>
  export default {
    name: "TopMenu"
  }
</script>

<style scoped>

</style>
