<script setup>
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import EventModel from "@/models/EventModel.js";
import CategoryModel from "@/models/CategoryModel.js";
import TrashIcon from "@/icons/TrashIcon.vue";
import router from "@/router/index.js";

// Define props
const props = defineProps({
  id: String
});

// Reactive variable to hold the event item data
const eventItem = ref(null);
const categories = ref([]);
const userInEvent = ref("");
const categoryOfUser = ref(0)

// Fetch event item data when the component is mounted
onMounted(async () => {
  await fetchEventData();
});

async function fetchEventData() {
  eventItem.value = await EventModel.getEventById(props.id);
  categories.value = await CategoryModel.getCategoriesById(props.id);

  // check if user in category.participants
  const object = await EventModel.isUserInEvent(props.id);
  userInEvent.value = object.username;
  categoryOfUser.value = object.category_id;
}

async function joinEvent(categoryId) {
  if (userInEvent.value) {
    const leftEvent = await leaveEvent(categoryId);
    if (!leftEvent) {
      // User canceled the leave action, so don't proceed with joining.
      return;
    }
  }

  console.log('Joining event', categoryId);
  await EventModel.joinEvent(props.id, categoryId);
  await fetchEventData();
}

function leaveEvent(categoryId) {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Opravdu chcete opustit pozici?',
      showCancelButton: true,
      confirmButtonText: 'Ano',
      confirmButtonColor: '#f54646',
      cancelButtonText: 'Ne',
      icon: 'error',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Leaving event', categoryId);
        await EventModel.leaveEvent(props.id, categoryId);
        await fetchEventData();
        resolve(true);  // User confirmed leaving
      } else {
        resolve(false); // User canceled the leave action
      }
    });
  });
}

function deleteEvent() {
  Swal.fire({
    title: 'Opravdu chcete smazat event?',
    showCancelButton: true,
    confirmButtonText: 'Ano',
    confirmButtonColor: '#f54646',
    cancelButtonText: 'Ne',
    icon: 'error',
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log('Deleting event', props.id);
      await EventModel.deleteEvent(props.id);
      await router.push('/');
    }
  });
}

</script>

<template>
  <div v-if="eventItem">
    <header id="event">
      <div class="info">
        <h1>{{ eventItem.name }}</h1>
        <p><mark>{{ eventItem.sport }}</mark></p>
        <p class="description">/ {{ eventItem.description }}</p>
        <p>/ {{ eventItem.date }}</p>
        <p>/ {{ eventItem.time }}</p>
        <p>/ {{ eventItem.location }}</p>
      </div>
      <TrashIcon @click="deleteEvent" v-if="eventItem.created_by_user"></TrashIcon>
    </header>

    <div v-for="category in categories" :key="category.id">
      <header class="category">
        <h2>{{ category.name }}</h2>
        <p v-if="!userInEvent" class="add" @click="joinEvent(category.id)">Přidat se jako {{ category.name.toLowerCase() }}</p>
        <p v-if="userInEvent && category.id !== categoryOfUser" class="add" @click="joinEvent(category.id)">Přidat se jako {{ category.name.toLowerCase() }}</p>
        <p v-else-if="userInEvent && category.id === categoryOfUser" class="leave" @click="leaveEvent(category.id)">Opustit pozici</p>
      </header>
      <table>
        <tr>
          <th>Uživatel</th>
          <th class="date">Přidán</th>
        </tr>
        <tr :class="participant.name === userInEvent ? 'user' : '' " v-for="participant in category.participants" :key="participant.id">
          <td v-if="participant.substitute">{{ participant.name }} - náhradník</td>
          <td v-else>{{ participant.name }}</td>

          <td class="date">{{ participant.created_at.toLocaleDateString() }}</td>
        </tr>
        <tr v-if="(category.capacity - category.participants.length) > 0" v-for="n in (category.capacity - category.participants.length)" :key="`empty-${n}`">
          <td>-</td>
          <td class="date">-</td>
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

header#event {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

header.category {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

div > p:first-of-type, p.description {
  margin-bottom: 1rem;
}

div > p:nth-of-type(n+3) {
  margin-bottom: 0.1rem;
}

.leave {
  color: #f54646;
}

.add:hover, .leave:hover {
  text-decoration: underline;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;

  margin-top: 0.5rem;

  font-size: 0.9rem;
}

td {
  border:1px solid #e5e5e5;
}

p {
  word-break: break-word;
}

.date {
  width: 100px;
}

th, td {
  text-align: left;
  padding: 0.5rem;
}

tr.user {
  background-color: #f0f0f0;
}

th {
  background-color: #3a3db2;
  border: none;
  color: white;
  font-weight: 500;
}

td {
  font-weight: 400;
}
</style>
