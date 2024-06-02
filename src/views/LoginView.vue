<script setup>
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {ref} from 'vue';
import {useTokenStore} from '@/stores/token';
import {useRouter} from 'vue-router';
import InputComponent from "@/components/base/InputComponent.vue";

// Define reactive state
const error = ref('');

const authStore = useTokenStore();
const router = useRouter();

// Define the validation schema
const {values, errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  }),
});

// Define form fields
const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

// Define the login function
const login = handleSubmit(async () => {
  error.value = ''; // Clear any previous errors
  try {
    const response = await authStore.login({username: values.username, password: values.password});
    router.push('/');

    console.log(response);
    if (response) {
      error.value = response;
    }

  } catch (err) {
    error.value = 'Něco se pokazilo...';
  }
});
</script>

<template>
  <div class="container" v-if="!authStore.isAuthenticated">
    <form @submit.prevent="login">
      <InputComponent v-model="username" v-bind="usernameAttrs" :error="errors.username" label="Uživatelské jméno" />
      <InputComponent v-model="password" v-bind="passwordAttrs" :error="errors.password" label="Heslo" type="password" />

      <button type="submit">Přihlásit se</button>
      <p v-if=error class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
  flex-direction: column;

  padding: 1rem;

  box-shadow: 0px 10px 15px 10px rgba(0,0,0,0.1);
}

button {
  background-color: var(--primary-color);
  border: none;
  width: 100%;
  padding: 1rem;

  color: white;
  font-size: 0.9rem;
}
</style>
