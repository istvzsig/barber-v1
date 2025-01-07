<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router/index.js'
const routes = router.getRoutes()
</script>

<template>
    <nav>
        <RouterLink v-for="(route, index) in routes" :key="index" :to="route.path">
            {{ route.name[0].toUpperCase() + [...route.name].splice(1).join('') }}
        </RouterLink>
    </nav>
</template>