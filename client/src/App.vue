<script setup>
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavigationBar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
