<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  error : String,
  categories: Array
});

const emit = defineEmits(['delete-category']);
function deleteCategory(index) {
  emit('delete-category', index);
}
</script>

<template>
  <div>
    <label for="category">Kategorie</label>
    <div class="category-list__item" v-for="category in categories" :key="category.id">
      <p>{{ category.name }} - {{ category.capacity }}</p>
      <button @click.prevent="deleteCategory">x</button>
    </div>
    <p v-if=error class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.category-list__item {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 0.9rem;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
}

button {
  border: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>