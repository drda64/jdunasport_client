<script setup>
import { ref, onMounted } from 'vue';
import EventItem from "@/models/EventItem.js";
import Category from "@/models/Category.js";

// Define props
const props = defineProps({
  id: String
});

// Reactive variable to hold the event item data
const eventItem = ref(null);
const categories = ref([]);

// Fetch event item data when the component is mounted
onMounted(async () => {
  await fetchEventData();
});

async function fetchEventData() {
  eventItem.value = await EventItem.getEventById(props.id);
  categories.value = await Category.getCategoriesById(props.id);
}

async function joinEvent(categoryId) {
  console.log('Joining event', categoryId);
  await EventItem.joinEvent(props.id, categoryId);
  await fetchEventData();
}

</script>

<template>
ahoj
</template>

<style scoped>

</style>