<template>
  <div class="project-content">
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>this is setting</div>
    <div>hello {{ this.$route.name }}</div>
    <div>
      <button type="button" @click = "endProject">End Project!</button>
      <form>
          Reward: <input type="text" name="Reward" placeholder= "reward" v-model ="reward"><br>
          Submit: <input type="button" @click="createNewTask" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {},
  layout: "project",
  data(){
    return{
      reward : "",
    }
  },
  computed: {
        ...mapGetters({
      getUserToken: "user/getUserToken",
      getUserTrelloId: "user/getUserTrelloId",
      getMemberWithProjectId: "projects/getMemberWithProjectId",
      getUserId: "user/getUserId",
      getTasks: "tasks/getTasks",
      getCurrentProject: "project/getCurrentProject",
      getTrelloTaskId: "tasks/getTrelloTaskId",

    }),
  },
  methods:{
    async endProject(){
      axios.patch("/api/v1/projects/" + this.$route.params.id, {
        finished: true
      }).then(response => console.log(response.data.data))
    },
    async setUpPage(){
      var currentmemberId = this.getCurrentProject.memb
    }
  },
  async created(){

  }
};
</script>

<style></style>
