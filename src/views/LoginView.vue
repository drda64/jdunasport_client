<script setup>
import { ref } from 'vue';
import { useTokenStore } from '../stores/token.js';
import { useRouter } from 'vue-router';

// Define reactive state
const username = ref('');
const password = ref('');
const error = ref('');

const authStore = useTokenStore();
const router = useRouter();

const login = async () => {
  error.value = ''; // Clear any previous errors
  try {
    await authStore.login({ username: username.value, password: password.value }).then(() => {
      router.push('/')
    });
    // Redirect to home page after successful login
  } catch (err) {
    error.value = 'Invalid username or password';
  }
};

</script>

<template>
  <div v-if="!authStore.isAuthenticated">
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
