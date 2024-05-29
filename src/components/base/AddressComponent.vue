<script setup>
import { ref } from 'vue'
import axios from "axios";

const address = ref('')
const suggestions = ref([])

// Emit event function
const emit = defineEmits(['update:modelValue'])

defineProps({
  error: String
})

async function fetchSuggestions() {
  if (address.value.length > 2) {
    try {
    const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${address.value}`,
        {
          params: {
            access_token: 'pk.eyJ1IjoiZHJkYTY0IiwiYSI6ImNraGJ2bjBhZDAyMWMydW5vNzRuNmo5NHQifQ.YeyjGGJeqtWo78QBSZwXoA', // replace with your Mapbox API key
            autocomplete: true
          }
        }
    );
    suggestions.value = decodeSuggestions(response.data.features);

    }
    catch (error) {
      if (!navigator.onLine) {
        suggestions.value = []
        suggestions.value.push({id: 0, full_address: "No internet connection"})
      }
    }
  } else {
    suggestions.value = [];
  }
}

function decodeSuggestions(suggestions) {
  return suggestions.map(suggestion => {
    return {
      id: suggestion.id,
      full_address: suggestion.properties.full_address
    }
  })
}

function clickSuggestion(suggestion) {
  console.log(suggestion)
  address.value = suggestion.full_address
  suggestions.value = []

  // emitting the new value to the parent component
  emit('update:modelValue', suggestion.full_address)
}

function hideSuggestions() {
  if (suggestions.value.length > 0)
    suggestions.value = []
}

function showSuggestions() {
    fetchSuggestions()
}

function inputAddress(value) {
  fetchSuggestions()
  // emitting the new value to the parent component
  emit('update:modelValue', value.target.value)
}

</script>

<template>
  <div class="autocomplete">
    <label for="address">Lokace</label>
    <input :class="{ 'open-input': suggestions.length > 0 }" type="text" v-model="address" @focusout="hideSuggestions" @focusin="showSuggestions" @input="inputAddress">
    <p v-if="error && suggestions.length === 0" class="error">{{ error }}</p>
    <div class="autocomplete-items" v-if="suggestions.length > 0">
      <div @click="console.log('clicked')" v-for="suggestion in suggestions" :key="suggestion.id">
        <div @mousedown.prevent="clickSuggestion(suggestion)">{{ suggestion.full_address }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.open-input {
  border-radius: 10px 10px 0 0;
}

.autocomplete {
  position: relative;
  display: inline-block;
}

.autocomplete-items {
  font-size: 0.9rem;
  position: absolute;
  border: 1px solid #d4d4d4;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;

  box-shadow: 0 10px 15px 9px rgba(0,0,0,0.1);
  border-radius: 0 0 10px 10px;
}

/* vnorene divy */
.autocomplete-items > div > div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
}

.autocomplete-items > div > div:hover {
  background-color: #85bbab;
  color: white;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
</style>