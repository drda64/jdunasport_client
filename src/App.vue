<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/events">Events</RouterLink>
  <RouterLink to="/create">Events</RouterLink>
  <RouterView />
</template>

<style scoped>
</style>
