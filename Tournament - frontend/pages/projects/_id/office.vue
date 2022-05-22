<template>
  <div class="project-content">
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>hello {{ this.$route.name }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>
      <li v-for="task in newtasks" :key ="task.id" >
        {{task.id}}
      </li>
    </div>
    <div>
      <form>
          Trello task Id: <input type="text" name="TrelloTaskId" placeholder="Trello Task Id" v-model = "trelloTaskId"><br>
          Percentage: <input type="text" name="Percentage" placeholder="Percentage" v-model = "percentage"><br>
          Submit: <input type="button" @click="createNewTask()" value="Submit">
      </form>
    </div>
    <div>
      <li v-for="task in activeTasks" :key ="task._id" >
        {{task._id}}
      </li>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {},
  layout: "project",  
  data() {
    return {
      alltask: [],
      trelloTaskId: "",
      percentage: "",
      taskName: "",
      oldtasks: [],
      activeTasks: [],
    };
  },
  computed:{
    ...mapGetters({
      getUserToken: "user/getUserToken",
      getUserTrelloId: "user/getUserTrelloId",
      getMemberWithProjectId: "projects/getMemberWithProjectId",
      getUserId: "user/getUserId",
      getTasks: "tasks/getTasks",
      getCurrentProject: "project/getCurrentProject",
      getTrelloTaskId: "tasks/getTrelloTaskId",
      getActiveTasks: "tasks/getActiveTasks"
    }),
    newtasks() {
      if(this.alltask.length > 0){
        var remainingTasks = this.alltask.filter(
          (task) => !this.oldtasks.includes(task.id)
        );
        return remainingTasks   
      }   
      return this.alltask.filter(
        (task) => !this.getTrelloTaskId.includes(task.trelloTaskId)
      );
    },
    memberActiveTasks(){
      if(this.activeTasks.length > 0){
        var remainingActiveTasks = this.activeTasks.filter(
          (task) => task.memberIncharged == this.getUserId
        );
        return remainingActiveTasks   
      }   
      return null;
    }
  },
  methods: {
    async getalltasks(){
      console.log("da run123")
      await axios.get("https://api.trello.com/1/boards/"
      + this.getCurrentProject.trelloBoardId + 
      "/cards?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token="
      + this.getUserToken)
      .then((response) => {
        console.log("all task ,", response.data)
        this.alltask = response.data
      })
      this.oldtasks = this.getTrelloTaskId
      this.activeTasks = this.getActiveTasks
      console.log(this.activeTasks)
      console.log(this.getActiveTasks)
    },
    async createNewTask(){
      await axios.get("https://api.trello.com/1/boards/"
      + this.getCurrentProject.trelloBoardId + "/cards/"
      + this.trelloTaskId + "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token="
      + this.getUserToken).then(
        response => {
          this.taskName = response.data.name
        }
      ),
      await axios.post("/api/v1/tasks/" + this.$route.params.id, {
        projectId: this.$route.params.id,
        trelloTaskId: this.trelloTaskId,
        taskName: this.taskName,
        memberIncharged: this.getUserId,
        percentage: this.percentage
      }).then(response => {
        console.log(response.data.data)
      })
    },
  }, 
  async created(){
    await this.getalltasks()
    console.log(this.getTrelloTaskId)
  }
}

</script>

<style></style>
