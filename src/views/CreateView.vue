<script setup>
import {useForm, validate} from 'vee-validate';
import {onMounted, ref} from 'vue';
import * as yup from 'yup';
import InputComponent from "@/components/base/InputComponent.vue";
import AddressComponent from "@/components/base/AddressComponent.vue";
import CategoryAdderComponent from "@/components/create/CategoryAdderComponent.vue";
import CategoryListComponent from "@/components/create/CategoryListComponent.vue";
import SelectComponent from "@/components/base/SelectComponent.vue";
import EventModel from "@/models/EventModel.js";
import axios from "axios";
import router from "@/router/index.js";
import {useTokenStore} from "@/stores/token";

const categories = ref([]);
const categoryError = ref('');
categories.value.push({name: 'Hráč', capacity: 1});

const options = ref([])

onMounted(() => {
  const token = useTokenStore();
  if (!token.isAuthenticated) {
    router.push('/login');
  }

  axios.get('http://localhost:8009/sports').then(response => {
    return response.data.map(sport => {
      options.value.push({value: sport.id, text: sport.name});
    });
  });
});


const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    sport: yup.number().required()
  }),
});

const [name, nameAttrs] = defineField('name', {
});

const [description, descriptionAttrs] = defineField('description', {
});

const [address, addressAttrs] = defineField('address', {
});

const [date, dateAttrs] = defineField('date', {
});

const [time, timeAttrs] = defineField('time', {
});

const [sport, sportAttrs] = defineField('sport', {
  initialValue: 1
});

function handleDeleteCategory(index) {
  categories.value.splice(index, 1);
  validateCategories()
}

function handleAddCategory(category) {
  categories.value.push(category);
  validateCategories()
}

const onSubmit = handleSubmit(values => {
  if (validateCategories()) {
    submitForm();
  }
});

function validateCategories() {
  if (categories.value.length === 0) {
    categoryError.value = 'Alespoň jedna kategorie musí být přidána';
    return false
  } else {
    categoryError.value = '';
    return true
  }
}

function submitForm() {
    let eventItem = new EventModel(values.name, values.description, values.address, values.date, values.time, values.sport, categories.value);
    eventItem.submitEvent();
}


</script>

<template>
  <h1>Vytvořit event</h1>
  <form @submit.prevent="onSubmit">
    <div class="column">
      <InputComponent v-model="name" v-bind="nameAttrs" :error="errors.name" label="Název"></InputComponent>
      <InputComponent v-model="description" v-bind="descriptionAttrs" :error="errors.description" label="Popis" textarea></InputComponent>
      <AddressComponent v-model="address" v-bind="addressAttrs" :error="errors.address" label="Adresa"></AddressComponent>
      <InputComponent v-model="date" v-bind="dateAttrs" :error="errors.date" label="Datum" type="date"></InputComponent>
      <InputComponent v-model="time" v-bind="timeAttrs" :error="errors.time" label="Čas" type="time"></InputComponent>
    </div>
    <div class="column">
      <SelectComponent v-model="sport" v-bind="sportAttrs" label="Sport" :options="options"></SelectComponent>
      <CategoryAdderComponent @add-category="handleAddCategory"></CategoryAdderComponent>
      <CategoryListComponent :error="categoryError" :categories="categories" @delete-category="handleDeleteCategory"></CategoryListComponent>

      <button type="submit">Vytvořit event</button>
    </div>
  </form>
  <pre>{{ values }}</pre>
  <pre>{{ errors }}</pre>
</template>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.column {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  background-color: #5EC4B1;
  border: none;

  padding: 1rem;

  font-size: 0.9rem;
}

@media screen and (min-width: 768px) {
  .column {
    flex: 1 1 48%;
  }
}
</style>
