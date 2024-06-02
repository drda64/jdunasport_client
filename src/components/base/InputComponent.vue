<script setup>
// defining props
import { ref } from 'vue';
import { defineProps } from 'vue';

// defining props
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: String,
  placeholder: String,
  textarea: Boolean,
  error: String
})

// defining emits
const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  inputValue.value = event.target.value;
};
</script>

<template>
  <div>
    <label>{{ label }}</label>
    <textarea v-if=textarea :placeholder=placeholder :value="inputValue" @input="updateValue"></textarea>
    <input v-if=!textarea :type=type :placeholder=placeholder :value="inputValue" @input="updateValue">
    <p v-if=error class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

textarea {
  height: 10rem;
}

</style>