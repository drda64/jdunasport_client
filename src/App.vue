<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/events">Přidat se do eventu</RouterLink>
      <RouterLink to="/create">Vytvořit event</RouterLink>
    </nav>
    <div id="view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
