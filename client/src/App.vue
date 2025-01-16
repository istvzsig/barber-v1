<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <div class="logo">
        <img src="./assets/logo.svg" alt="">
      </div> -->
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

::-webkit-scrollbar {
  display: none;
}

.logo {
  position: relative;
  top: 50px;
  text-align: center;
  mix-blend-mode: screen;
  filter: hue-rotate(90deg);
}

.logo img {
  scale: 420%;
}

/* .logo::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  z-index: 1000;
  background-color: red;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  z-index: 1;
  display: none;
} */

@media screen and (max-width: 700px) {
  .logo {
    scale: 80%;
  }
}

img {
  max-width: 100px;
  margin: auto;
  mix-blend-mode: screen;
}
</style>
