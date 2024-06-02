<script setup>
import {ref} from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
const { notify }  = useNotification()

const categoryName = ref('');
const categoryNumber = ref('');

function validateNumberInput(event) {
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

const emit = defineEmits(['add-category']);

function validateSubmit() {
  if (!validateCategoryNumber()) {
    return false;
  }
  emit('add-category', {
    name: categoryName.value,
    capacity: categoryNumber.value
  });
}

function validateCategoryNumber() {
  if (categoryNumber.value <= 0) {
    notify({
      type: 'error',
      title: 'Chyba',
      text: 'Kapacita kategorie musí být větší než 0'
    });
    return false;
  }
  if (categoryNumber.value > 100) {
    notify({
      type: 'error',
      title: 'Chyba',
      text: 'Kapacita kategorie nesmí být větší než 100'
    });
    return false;
  }
  if (categoryName.value === '') {
    notify({
      type: 'error',
      title: 'Chyba',
      text: 'Název kategorie nesmí být prázdný'
    });
    return false;
  }

  return true;

}
</script>

<template>
  <div>
    <label>Přidat kategorii</label>
    <div id="category-adder-container">
      <input v-model="categoryName" type="text" placeholder="Hráč">
      <input type="number" v-model="categoryNumber" class="counter" @keydown="validateNumberInput" step="1" min="1" value="1">
      <button @click.prevent="validateSubmit">Přidat</button>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

#category-adder-container {
  display: flex;
  gap: 1rem;
}

.counter {
  width: 5rem;
}

button {
  background-color: #5EC4B1;
  border: none;

  padding-left: 2rem;
  padding-right: 2rem;

  font-size: 0.9rem;
}
</style>