<script setup>

defineProps({
  event: Object
})

</script>

<template>
  <div class="container">
    <div class="left-group">
      <div class="top-group">
        <h3>{{ event.name }}</h3>
        <p>{{ event.date }} {{ event.time }}</p>
      </div>
      <div class="bottom-group">
        <p><mark>{{ event.sport }}</mark></p>
      </div>
    </div>
    <div class="right-group">
      <div :class="event.created_by_user ? 'green dot' : 'blue dot'"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex: 1 1 calc(33.333% - 20px);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 8rem;
  padding: 1.5rem;

  background-color: #FAFAFA;
}

.left-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  box-sizing: border-box;
}

.green {
  background-color: #1FC974;
}

.blue {
  background-color: #1F9CE9;

}

.container:hover {
  background-color: #b2e7da;
  cursor: pointer;
}

.container:hover mark {
  background-color: #000000;
  color: white

}

p {
  font-size: 0.9rem;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 1480px) {
  .container {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 680px) {
  .container {
    flex: 1 1 calc(100% - 20px);
  }
}
</style>