<template>
  <div>
      <CreatePopUp/>

      <nuxt/>
  </div>
</template>

<script>
import ChooseTask from "../../components/ChooseTask.vue";
import CreatePopUp from "../../components/CreatePopUp.vue";
import Cover from "../../components/Cover.vue"
export default {
  components: {
    ChooseTask,
    CreatePopUp,
    Cover
  }
};          
</script>


<style>

</style>
