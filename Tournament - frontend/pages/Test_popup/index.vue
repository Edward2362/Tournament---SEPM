<template>
  <div>
      <Createpopup/>

      <nuxt/>
  </div>
</template>

<script>
import Choosetask from "../../components/Choosetask";
import Createpopup from "../../components/Createpopup";
import Cover from "../../components/Cover.vue"
export default {
  components: {
    Choosetask,
    Createpopup,
    Cover
  }
};          
</script>


<style>

</style>
