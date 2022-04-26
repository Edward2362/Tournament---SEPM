<template>
  <div>
    <div
      class="blur"
      :class="{ 'active-pop-up': isOverlay }"
      @click="bluring"
    ></div>
    <div class="test" :class="{ 'active-pop-up': isOverlay }">
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "PopUpCreate",
  data() {
    return {
      boardfromtrello: {
        value: null,
        isValid: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      getProjectId: "projects/getProjectId",
      userId: "user/getUserId",
      isOverlay: "document/isOverlay"
    }),
  },
  methods: {
    ...mapMutations({
    bluring: "document/setOverlay",
    getboardstrello(){
      this.boardfromtrello = axios.get("https://api.trello.com/1/members/" + {userId} + "/boards")
      for(Id in getProjectId)
      {
        for(board in this.boardfromtrello){
          if(board.id == Id){
            this.boardfromtrello.filter()
          }
        }
      }
    }
    }),
  },
};
</script>

<style></style>
