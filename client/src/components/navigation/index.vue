<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { handlePointerDown, handlePointerUp } from './service.js'
import router from '../../router/index.js'
const routes = router.getRoutes()
</script>

<template>
    <nav>
        <div class="links">
            <RouterLink v-for="(route, index) in routes" :key="index" :to="route.path">
                {{ route.name[0].toUpperCase() + [...route.name].splice(1).join('') }}
            </RouterLink>
        </div>
        <button @pointerdown="handlePointerDown" @pointerup="handlePointerUp" class="booking-button">BOOK</button>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav * {
    font-weight: 600;
}
</style>