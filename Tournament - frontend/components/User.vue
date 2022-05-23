<template>
  <div id="profile">
    <img htmlFor="profile" :src="avatarurl" />
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "User",
  computed:{
    ...mapGetters({
      avatarurl : "user/getAvatarUrl"
    })
  }
};
</script>

<style scoped>
@import "../assets/styles/user.css";
</style>