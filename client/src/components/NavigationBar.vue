<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router/index.js'
const routes = router.getRoutes()
</script>

<template>
    <nav>
        <div class="links">
            <RouterLink v-for="(route, index) in routes" :key="index" :to="route.path">
                {{ route.name[0].toUpperCase() + [...route.name].splice(1).join('') }}
            </RouterLink>
        </div>
        <button class="booking-button">BOOK</button>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav * {
    font-weight: bold;
}

.booking-button {
    padding: 1rem;
    border-radius: 10px;
    color: var(--main-white);
    font-weight: bold;
    font-size: 13px;
    background-color: transparent;
    background-color: rgba(0, 0, 0, 0) !important;
    cursor: crosshair;
}
</style>