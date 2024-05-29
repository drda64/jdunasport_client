<script setup>
import EventItem from "@/models/EventItem.js";
import { ref, onMounted } from "vue";

const events = ref([]);

onMounted(async () => {
  events.value = await EventItem.getAllEvents();
});
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div v-for="event in events" :key="event.id">
      <p>{{ event.name }}</p>
      <p>{{ event.location }}</p>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
