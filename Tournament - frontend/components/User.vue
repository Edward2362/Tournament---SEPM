<template>
  <div id="profile">
    <img htmlFor="profile" :src="avatar" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "User",
  props: ["avatar"],
};
</script>

<style scoped>
@import "../assets/styles/user.css";
</style>
