<template>
  <div><AppHeader /> <nuxt /> <PopUpCreate /></div>
</template>

<script>
import AppHeader from "../components/AppHeader";
import PopUpCreate from "../components/PopUpCreate.vue";

export default {
  components: {
    AppHeader,
    PopUpCreate,
  },
};
</script>

<style></style>
