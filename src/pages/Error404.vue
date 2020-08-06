<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        啊嘞？这是哪里……
      </div>

      <q-btn class="q-mt-xl"
             color="white"
             text-color="blue"
             unelevated
             to="/"
             label="返回"
             no-caps/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error404'
  }
</script>
