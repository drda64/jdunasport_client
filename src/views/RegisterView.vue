<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import { useRouter } from 'vue-router';
import InputComponent from "@/components/base/InputComponent.vue";

// Define reactive state
const mainError = ref('');

const authStore = useTokenStore();
const router = useRouter();

// Define the validation schema
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().required('Uživatelské jméno je povinné.'),
    password: yup.string().min(6, 'Heslo musí mít alespoň 6 znaků.').required('Heslo je povinné.'),
    email: yup.string().email('Neplatná e-mailová adresa').required('E-mail je povinný.')
  }),
});

// Define form fields
const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');
const [email, emailAttrs] = defineField('email');

const registerHandler = handleSubmit(async () => {
  mainError.value = ''; // Clear any previous errors

  const err = await authStore.register({
    username: values.username,
    password: values.password,
    email: values.email
  });

  console.log(err);
  if (err) {

    if (err.email) {
      errors.value.email = err.email[0];
      console.log(errors.value.email);
    }
    if (err.username) {
      errors.value.username = err.username[0];
    }
    if (err.password) {
      errors.value.password = err.password[0];
    }

    mainError.value = 'Opravte prosím chyby ve formuláři.';
  }
  else {
    router.push('dashboard');
  }
});
</script>

<template>
  <div class="container" v-if="!authStore.isAuthenticated">
    <form @submit.prevent="registerHandler">
      <InputComponent v-model="username" v-bind="usernameAttrs" :error="errors.username" label="Uživatelské jméno" />
      <InputComponent v-model="email" v-bind="emailAttrs" :error="errors.email" label="E-mail" type="email" />
      <InputComponent v-model="password" v-bind="passwordAttrs" :error="errors.password" label="Heslo" type="password" />

      <button type="submit">Registrovat se</button>
      <p v-if="mainError" class="error">{{ mainError }}</p>
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
