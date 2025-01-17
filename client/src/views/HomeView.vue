<script setup>
import VideoBackground from '../components/video-background/index.vue';
import LocationMap from '../components/map/index.vue';
import Portfolio from '../components/portfolio/index.vue';
</script>

<template>
  <div class="container">
    <VideoBackground />
    <h1>Nálunk a hagyomány és a rusztikus stílus találkozik</h1>
    <div class="cta-container">
      <a class="booking-button" href="/booking">Időpont <br> foglalás</a>
      <img src="../assets/scissors.svg" alt="">
      <a :disabled="true" class="telephone-button" href="tel:+36705382789">+36 70 53 82 789</a>
    </div>
    <LocationMap />
    <img class="scissors-big" src="../assets/scissors.svg" alt="">
    <Portfolio />
    <p class="copyright">© 2025 Figaro Barber Shop. Minden jog fenntartva.</p>
  </div>
</template>

<style scoped>
div.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Frank Ruhl Libre", serif;
  font-optical-sizing: auto;
  font-style: normal;
  padding-top: 100px;
}

h1 {
  font-size: 7vw;
  color: ivory;
  text-transform: uppercase;
  text-align: center;
  padding: 2rem 0;
  letter-spacing: 5px;
}

h4 {
  font-size: 4vw;
  font-family: "Montserrat", sans-serif;
  color: ivory;
  text-align: center;

}

p.copyright {
  text-align: center;
  font-size: 10pt;
  color: ivory;
  opacity: 100%;
  mix-blend-mode: overlay;

}

div.cta-container {
  display: grid;
  grid: auto / auto;
  justify-content: center;
  padding: 2rem 0;
}

div.cta-container *:not(img, p) {
  padding: 1rem 4rem;
  box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
}

div.cta-container * {
  font-size: 6vw;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

div.buttons {
  place-items: center;
  list-style: none;
}

a.booking-button {
  color: #E6BE8A;
  box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
}

a.telephone-button {
  mix-blend-mode: normal;
  color: #E6BE8A;
  box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A !important;
}

a.telephone-button:hover {
  /* color: #E6BE8A; */
  /* box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A; */
}

.scissors-big {
  width: 150px;
  rotate: -90deg;
  margin: 2rem auto;
  mix-blend-mode: overlay;
}
</style>