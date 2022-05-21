<template>
  <div class="task">
    <div class="task-info"><User /></div>
    <div class="task-name">Design UX/UI</div>
  </div>
</template>

<script>
import User from "../components/User.vue";

export default { name: "Task", components: { User } };
</script>

<style>
@import "../assets/styles/task.css";
</style>
