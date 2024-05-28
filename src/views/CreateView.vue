<script setup>
import { ref } from 'vue';
import { useTokenStore } from '../stores/token.js';

// categories array ref
const categories = ref([]);
const categoryName = ref('');
const capacity = ref(0);

// form inputs for event
const name = ref('');
const description = ref('');
const date = ref('');
const time = ref('');
const location = ref('');

function addCategory() {
  categories.value.push({ name: categoryName.value, capacity: capacity.value });
}

</script>

<template>
  <h1>Vytvořit event</h1>

  <AddressComponent v-model="location"/>
</template>

<style scoped>

</style>