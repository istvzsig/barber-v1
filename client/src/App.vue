<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <img src="./assets/logo.svg" alt="">
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&display=swap');

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  text-align: center;
  padding-top: 1rem;
}

img {
  max-width: 100px;
  margin: auto;
  mix-blend-mode: screen;
}
</style>
