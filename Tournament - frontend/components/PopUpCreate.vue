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
      <div>
        {{getUserTrelloId}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions} from "vuex";
import axios from "axios";

export default {
  name: "PopUpCreate",
  data() {
    return {
      boardfromtrello: {
        value: null,
        isValid: false,

      },
      //test
      user: null,
      boards: null,
    }
  },
  computed: {
    ...mapGetters({
      getProjectId: "projects/getProjectId",
      isOverlay: "document/isOverlay",
      getUserTrelloId: "user/getUserTrelloId",
      getUserToken: "user/getUserToken",
      getUser: "user/getUser",

    }),
  },
  methods: {
    ...mapActions({ changeTrelloId: "user/changeTrelloId" }),
    ...mapMutations({
    bluring: "document/setOverlay",
    async getboardstrello(){
      console.log(this.getUser)
      this.boards = await axios.get("https://api.trello.com/1/members/" + this.getUserTrelloId + "/boards?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" + this.getUserToken)
      // console.log(this.boards)
      for (let i = 0; i < this.boards.data.length; i++)
      {
        // console.log(this.boards.data[i]["id"])
        // for(board in this.boardfromtrello){
        // }
      }
      for(let i = 0; i < this.getProjectId.length; i++){
        // console.log(this.getProjectId[i])
      }
    }
    }),
  },
  async created(){
    // test
    console.log(this.getUser)
    this.user = await axios.get("https://api.trello.com/1/members/me?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=8de85f25dab780dccfb2a24de777b1e00e124567babbc32aec94a96d577917d6")
    this.changeTrelloId(this.user.data["id"])
    //endtest
    // console.log(this.getUserTrelloId)
    this.getboardstrello()
  }
};
</script>

<style></style>
