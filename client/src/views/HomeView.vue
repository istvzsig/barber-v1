<script setup>
import Layout from './Layout.vue'
</script>

<template>
  <div class="demo-video">
    <video src="" autoplay></video>
  </div>
  <Layout>
    asdsad

  </Layout>
</template>

<style scoped>
.demo-video::after {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 65%);
  backdrop-filter: blur(3px);
  mix-blend-mode: overlay;
  z-index: -999;
}

.demo-video {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../assets/demo-1.gif");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat !important;
  z-index: -1000;
}
</style>