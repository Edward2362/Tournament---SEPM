<template>
  <div class="trello-board-card" @click="AddTask(task.id)">
    <h2>{{ task.name }}</h2>
  </div>
</template>

<script>
export default {
  name: "AddTasks",
  props: ["task"],

  methods: {
    AddTask(id) {
      this.$emit("AddTask", id);
    },
  },
};
</script>

<style>
@import "../assets/styles/trello-card.css";
</style>
