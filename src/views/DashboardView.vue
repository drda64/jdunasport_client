<script setup>
import EventModel from "@/models/EventModel.js";
import {ref, onMounted, onUnmounted} from "vue";
import EventComponent from "@/components/dashboard/EventComponent.vue";
import router from "@/router/index.js";
import {useTokenStore} from "@/stores/token.js";
import {useLoaderStore} from "@/stores/loader.js";

const events = ref([]);
const buttonHistoryTitle = ref("Zobrazit proběhlé eventy");
const buttonDateTitle = ref("Od nejbližšího data");
const buttonDate = ref(false);
const buttonHistory = ref(false);
const page_number = ref(1);
const totalPages = ref(0);

const token = useTokenStore()
const loader = useLoaderStore()

onMounted(async () => {
  await fetchEventData()
});

// function to go to event
function goToEvent(id) {
  router.push(`/event/${id}`);
}

// function to fetch event data
async function fetchEventData() {
  loader.startLoading();
  if (!token.isAuthenticated) {
    return;
  }

  // Fetch events
  const response = await EventModel.getAllEvents(buttonHistory, buttonDate, page_number);

  // Set reactive variables
  totalPages.value = response.totalPages;
  events.value = response.events;
  page_number.value = response.currentPage;

  loader.stopLoading();
}

function pushHistoryButton() {
  if (buttonHistoryTitle.value === "Zobrazit proběhlé eventy") {
    buttonHistoryTitle.value = "Zobrazit aktuální eventy";
    buttonHistory.value = true;
  } else {
    buttonHistoryTitle.value = "Zobrazit proběhlé eventy";
    //events.value = await EventModel.getAllEvents();
    buttonHistory.value = false;
  }
  console.log(buttonHistory.value);
  fetchEventData()
}

function pushDateButton() {
  if (buttonDateTitle.value === "Od nejbližšího data") {
    buttonDateTitle.value = "Od nejvzdálenějšího data";
    buttonDate.value = true;
  } else {
    buttonDateTitle.value = "Od nejbližšího data";
    buttonDate.value = false;
  }
  console.log(buttonDate.value);
  fetchEventData()
}

function nextPage() {
  // Check if there is a next page
  if (page_number.value < totalPages.value) {
    page_number.value++;
    console.log(page_number.value);
    fetchEventData();
  }
}

function previousPage() {
  // Check if there is a previous page
  if (page_number.value > 1) {
    page_number.value--;
    console.log(page_number.value);
    fetchEventData();
  }
}
</script>

<template>
  <div v-if="totalPages > 1">{{ page_number}} z {{ totalPages }}</div>
  <h1>Dashboard</h1>
  <button @click="pushHistoryButton">{{ buttonHistoryTitle }}</button>
  <button @click="pushDateButton">{{ buttonDateTitle }}</button>
  <p v-if="events.length < 1 && !loader.loading">Bohužel zde nemáte žádné eventy. Přidejte si ho přes odkaz či vytvořte vlastní.</p>
  <div class="container-event">
    <EventComponent v-for="event in events" :key="event.id" :event="event" @click="goToEvent(event.id)"/>
  </div>

  <button v-if="totalPages > 1" class="pager" @click="previousPage">Předchozí</button>
  <button v-if="totalPages > 1" class="pager" @click="nextPage">Další</button>
</template>

<style scoped>
.container-event {
  display: flex;

  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap between items as needed */
  box-sizing: border-box;
}

h1 {
  margin-bottom: 0.5rem;
}

button {
  border: none;
  border-radius: 0;
  padding: 0.5rem;
  margin-right: 0.5rem;

  margin-bottom: 2rem;

  background-color: var(--primary-color);
  color: white;
}

button.pager {
  margin-top: 2rem;

}

/* Base styling for the grid container */
.container {
}

</style>
