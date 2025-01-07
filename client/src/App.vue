<script setup>
import NavigationBar from './features/navigation/index.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavigationBar />
      <div class="logo">
        <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HCnbv2ctB5tp2F9IzOe3FgHaE8%26pid%3DApi&f=1&ipt=7f84f751766b512848974bcd896025bef7360370a31453aed421da3ec169714b&ipo=images"
        alt="">
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

img {
  max-width: 100px;
  margin: auto;
  mix-blend-mode: screen;
}
</style>
