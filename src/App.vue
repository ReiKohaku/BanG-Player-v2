<template>
  <div id="q-app">
    <audio id="audioPlayer"
           ref="audioPlayer"
           preload="auto"
           loop
           src=""/>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    mounted() {
      this.$audio.setPlayer(document.getElementById('audioPlayer'));
      const loader = document.getElementById('loader');
      let loaderOpacity = 1;
      const fadeOut = setInterval(() => {
        if (!loader) {
          clearInterval(fadeOut);
        } else if (loaderOpacity <= 0) {
          clearInterval(fadeOut);
          loader.remove();
        } else {
          loader.style.opacity = loaderOpacity;
          loaderOpacity -= 0.05;
        }
      }, 50);
    }
  }
</script>
<style>
  @import 'css/font.css';
</style>
