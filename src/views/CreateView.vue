<script setup>
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import InputComponent from "@/components/base/InputComponent.vue";
import AddressComponent from "@/components/base/AddressComponent.vue";
import CategoryAdderComponent from "@/components/create/CategoryAdderComponent.vue";

const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
  }),
});

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
});

const [description, descriptionAttrs] = defineField('description', {
  validateOnModelUpdate: false,
});

const [address, addressAttrs] = defineField('address', {
  validateOnModelUpdate: false,
});

const [date, dateAttrs] = defineField('date', {
  validateOnModelUpdate: false,
});

const [time, timeAttrs] = defineField('time', {
  validateOnModelUpdate: false,
});
</script>

<template>
  <h1>Vytvořit event</h1>
  <form>
    <div class="column">
      <InputComponent v-model="name" v-bind="nameAttrs" :error="errors.name" label="Název"></InputComponent>
      <InputComponent v-model="description" v-bind="descriptionAttrs" :error="errors.description" label="Popis" textarea></InputComponent>
      <AddressComponent v-model="address" v-bind="addressAttrs" :error="errors.address" label="Adresa"></AddressComponent>
      <InputComponent v-model="date" v-bind="dateAttrs" :error="errors.date" label="Datum" type="date"></InputComponent>
      <InputComponent v-model="time" v-bind="timeAttrs" :error="errors.time" label="Čas" type="time"></InputComponent>
    </div>
    <div class="column">
      <CategoryAdderComponent></CategoryAdderComponent>
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.column {
  flex: 1 1 48%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (min-width: 768px) {
  .column {
    flex: 1 1 100%;
  }

}
</style>
