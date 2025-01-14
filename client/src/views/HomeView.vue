<script setup>
import VideoBackground from '../components/video-background/index.vue'
</script>

<template>
  <div class="container">
    <VideoBackground />
    <h1>Nálunk a hagyomány és a rusztikus stílus találkozik</h1>
    <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
    <div class="cta-container">
      <a class="booking-button" href="/booking">Időpont <br> foglalás</a>
      <img src="../assets/scissors.svg" alt="">
      <a class="telephone-button" href="tel:+36123456789">Telefon</a>
      <p class="copyright">© 2025 Classic Cuts Barber Shop. Minden jog fenntartva.Stílus és precizitás – generációkon
        át.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Frank Ruhl Libre", serif;
  font-optical-sizing: auto;
  font-style: normal;
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
  font-size: 8pt;
  color: ivory;
  opacity: 50%;
}

.cta-container {
  display: grid;
  grid: auto / auto;
  justify-content: center;
  padding: 2rem 0;
}

.cta-container *:not(img, p) {
  padding: 1rem 4rem;
  box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
}

.cta-container * {
  font-size: 6vw;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.cta-container .booking-button {
  color: #E6BE8A;
  box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
}

.cta-container .telephone-button {
  box-shadow: inset 1px 1px 0 ivory, inset -1px -1px 0 ivory;
}

.buttons {
  place-items: center;
  list-style: none;
}
</style>