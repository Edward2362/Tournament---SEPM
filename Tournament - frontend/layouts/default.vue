<template>
  <div><AppHeader /> <nuxt /> <PopUpCreate /></div>
</template>

<script>
import AppHeader from "../components/AppHeader";
import PopUpCreate from "../components/PopUpCreate.vue";
import axios from "axios";

export default {
  components: {
    AppHeader,
    PopUpCreate,
  },
  methods: {
    async checkPage() {
      if (typeof window !== "undefined") {
        await axios
          .get("/api/v1/users/me")
          .then((response) => {})
          .catch((error) => {
            this.$router.push({ name: 'authentication' });
          });
      }
    },
  },
  mounted() {
    this.checkPage();
  },
};
</script>

<style></style>
