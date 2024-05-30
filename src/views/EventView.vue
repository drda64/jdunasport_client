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
  <div v-if="eventItem">
    <h1>{{ eventItem.name }}</h1>
    <p><mark>{{ eventItem.sport }}</mark></p>
    <p class="description">/ {{ eventItem.description }}</p>
    <p>/ {{ eventItem.date }}</p>
    <p>/ {{ eventItem.time }}</p>
    <p>/ {{ eventItem.location }}</p>

    <div v-for="category in categories" :key="category.id">
      <header>
        <h2>{{ category.name }}</h2>
        <p class="add" @click="joinEvent(category.id)">Přidat se jako {{ category.name.toLowerCase() }}</p>
      </header>
      <table>
        <tr>
          <th>Jméno</th>
        </tr>
        <tr v-for="participant in category.participants" :key="participant.id">
          <td>{{ participant.name }}</td>
        </tr>
        <tr v-for="n in (category.capacity - category.participants.length)" :key="`empty-${n}`">
          <td>-</td>
        </tr>
      </table>
    </div>

  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 0.3rem;
}

h2 {
  margin: 0;
}

header {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div > p:first-of-type, p.description {
  margin-bottom: 1rem;
}

div > p:nth-of-type(n+3) {
  margin-bottom: 0.1rem;
}

.add:hover {
  text-decoration: underline;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;

  margin-top: 0.5rem;
}

td {
  border:1px solid #e5e5e5;
}

th, td {
  text-align: left;
  font-weight: 500;
  padding: 0.5rem;
}

th {
  background-color: #5EC4B1;
  border: none;

  margin-bottom: 0.5rem;
}

td {
  font-weight: 400;
}
</style>
