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
  <div v-if="!online" id="offline">
    <h3>Bohužel se zdá, že nemáte připojení k internetu. Bez toho naše aplikace fungovat nemůže. Sportu zdar 🥅</h3>
  </div>

  <div v-else id="app-container">
    <nav v-if="token.isAuthenticated">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/create">Vytvořit event</RouterLink>
      <p class="logout" @click="logout">Odhlásit se</p>
    </nav>
    <div v-if="!token.isAuthenticated" id="welcome">
      <p>Vítejte do projektu <mark>jdunasport.cz</mark> a udělejte si přehled o svých sportovních akcích.</p>
    </div>
    <nav v-if="!token.isAuthenticated">
      <RouterLink to="/login">Přihlásit se</RouterLink>
      <RouterLink to="/register">Registrovat se</RouterLink>
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
  padding-bottom: 2rem;
}

#view {
  margin-top: 3rem;
}

#welcome {
  margin-top: 3rem;
  text-align: center;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

#offline {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 2rem;

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

.logout {
  cursor: pointer;
}
</style>
