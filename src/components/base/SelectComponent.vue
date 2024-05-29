<script setup>

import {ref} from "vue";

const props = defineProps({
  modelValue : [String, Number],
  label : String,
  options : Array,
})

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

emit('update:modelValue', 1);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  inputValue.value = event.target.value;
  console.log(inputValue.value);
};
</script>

<template>
  <div>
    <label>{{ label }}</label>
    <select @change="updateValue">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<style scoped>

</style>