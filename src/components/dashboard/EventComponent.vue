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
  background-color: #41b17e;
}

.blue {
  background-color: #34485c;

}

.container:hover {
  background-color: #c7c7c7;
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