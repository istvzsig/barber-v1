<script setup>
defineProps({
    content: String,
})
</script>
<template>
    <NavgiationBar />
    {{ content }}
    <NavgiationBar />
</template>