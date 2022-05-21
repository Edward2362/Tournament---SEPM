<template>
  <div class="project-content">
    <h2 class="section-head">Team</h2>
    <div class="section-body"><Tasks /></div>
  </div>
</template>

<script>
import Tasks from "../../../components/Tasks.vue";

export default {
  components: { Tasks },
  layout: "project",
};
</script>

<style></style>
