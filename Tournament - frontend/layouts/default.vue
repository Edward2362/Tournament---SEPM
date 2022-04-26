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
  methods:{
    async Checkpage() {
      if(typeof window !== "undefined"){
        await axios.get("api/v1/users/me")
        .then(response => {})
        .catch(error => {
          window.location.replace("authentication")
        })
      }
    }
  },
  mounted(){
    this.Checkpage()
  }
};
</script>

<style></style>
