<script setup>
import EventItem from "@/models/EventItem.js";
import { ref, onMounted } from "vue";
import EventComponent from "@/components/dashboard/EventComponent.vue";
import router from "@/router/index.js";

const events = ref([]);

onMounted(async () => {
  events.value = await EventItem.getAllEvents();
});

function goToEvent(id) {
  router.push(`/event/${id}`);
}
</script>

<template>
  <h1>Dashboard</h1>
  <div class="container-event">
    <EventComponent v-for="event in events" :key="event.id" :event="event" @click="goToEvent(event.id)"/>
  </div>
</template>

<style scoped>
.container-event {
  display: flex;

  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap between items as needed */
  box-sizing: border-box;
}

/* Base styling for the grid container */
.container {
}

</style>
