<script setup>
import {ref} from 'vue';
import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()

const categoryName = ref('');
const categoryNumber = ref('');

function emitCategory() {
  console.log("fff")
}

function validateNumberInput(event) {
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

function validateSubmit() {
  validateCategoryNumber()
}

function validateCategoryNumber() {
  if (categoryNumber.value > 0) {
    return true
  }
  else {
    notify({
      title: "Kapacita kategorie",
      text: "Musí být více než 0",
      type: "error"
    });
    return false
  }
}
</script>

<template>
  <div>
    <label>Přidat kategorii</label>
    <div id="category-adder-container">
      <input v-model="categoryName" type="text" placeholder="Hráč">
      <input type="number" v-model="categoryNumber" class="counter" @keydown="validateNumberInput" step="1">
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
  border-radius: 10px;
  background-color: #5EC4B1;
  border: none;

  padding-left: 2rem;
  padding-right: 2rem;

  font-size: 0.9rem;
}
</style>