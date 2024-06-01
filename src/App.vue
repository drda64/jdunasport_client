<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useTokenStore } from '@/stores/token.js';
import router from '@/router/index.js';
import {onDeactivated, onMounted, ref} from "vue";

const token = useTokenStore();

const logout = () => {
  token.logout();
  console.log('Logging out');
  router.push('/login');
}

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
});

const online = ref(true);

const updateOnlineStatus = () => {
  console.log('Online status changed');
  if (navigator.onLine) {
    online.value = true;
    console.log('Online');
  } else {
    online.value = false;
    console.log('Offline');
    router.push('/offline');
  }
}

onDeactivated(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
})
</script>

<template>
  <div v-if="token.isAuthenticated">
    a
  </div>
  <div v-else>
    na
  </div>
  <div id="app-container">
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/events">Přidat se do eventu</RouterLink>
      <RouterLink to="/create">Vytvořit event</RouterLink>
      <button @click="token.logout">Odhlásit se</button>
    </nav>
    <div id="view">
      <RouterView />
    </div>
  </div>

  <notifications />
</template>

<style scoped>
  #app-container {
    max-width: 60rem;
    width: 100%;

    padding-left: 2rem;
    padding-right: 2rem;
  }

  #view {
    margin-top: 3rem;
  }

  nav {
    margin-top: 5rem;
    display: flex;
    gap: 2.5rem;

    font-size: 0.9rem;
  }

  nav a {
    text-decoration: none;
    color: #000;
  }
</style>
