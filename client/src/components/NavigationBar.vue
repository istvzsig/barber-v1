<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router/index.js'
const routes = router.getRoutes()
function setButtonState(button, state) {
    button.dataset["state"] = state;
}
function onPointerDown(e) {
    setButtonState(e.target, "clicked");
}
function onPointerUp(e) {
    if (e.target.dataset["state"] = "clicked") {
        e.target.addEventListener("animationend", _ => {
            setButtonState(e.target, "")
        });
    }
}
</script>

<template>
    <nav>
        <div class="links">
            <RouterLink v-for="(route, index) in routes" :key="index" :to="route.path">
                {{ route.name[0].toUpperCase() + [...route.name].splice(1).join('') }}
            </RouterLink>
        </div>
        <button @pointerdown="onPointerDown" @pointerup="onPointerUp" class="booking-button">BOOK</button>
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

.booking-button {
    padding: 1rem;
    border-radius: 10px;
    color: var(--main-white);
    font-weight: 900;
    font-size: 13px;
    background-color: ivory;
    cursor: crosshair;
    transition: 420ms ease-out;
    background-color: transparent;
    animation: 420ms forwards linear;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.booking-button[data-state="clicked"] {
    animation-name: anime;
}

@keyframes anime {
    0% {
        color: black;
        /* box-shadow: inset 3px 3px 0 ivory; */
    }

    50% {
        box-shadow: inset 123px 123px 0 ivory;
    }

    90% {
        color: black;
    }

    100% {
        color: ivory;
        box-shadow: inset 0 0 0 ivory;
    }
}
</style>