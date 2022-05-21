<template>
  <div class="trello-board-card" @click="chooseBoard(board.id)">
    <h2>{{ reportId}}</h2>
    <div>
        <h1>
            {{taskNames}}
        </h1>
        <p>
            {{memberIncharge}}
        </p>
        <p>
            {{percentage}}
        </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ReportCard",
  props: ["reportId"],
//   methods: {
//     // chooseBoard(id) {
//     //   this.$emit("choose-board", id);
//     // },
//   },
  computed:{
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
  data(){
      return{
          taskNames: [],
          memberIncharge: [],
          allTasks: [],
          thisWeekTasks: [],
          percentage: [],
      }
  },
  methods:{
      async setUpPopUp(){
          console.log("route, ", this.$route.params.id, " report Id, ", this.reportId)
          await axios.get("/api/v1/reports/"+ this.$route.params.id + "/" + this.reportId).then(response=>{
              this.thisWeekTasks = response.data.data.tasks
              console.log("yeah yeah", response.data.data, " hey hey ", this.reportId)
          })
          console.log("This week task", this.thisWeekTasks)
          await axios.get("/api/v1/tasks/"+ this.$route.params.id).then(response =>{
              this.allTasks = response.data.data
          })
          console.log("all task, ", this.allTasks)
        //   for(let i = 0; i < this.tasks.length; i++){
            var choosenTask = this.allTasks.filter((task)=> this.thisWeekTasks.includes(task._id))
        //   }
        console.log("choosentask", choosenTask)
        if(choosenTask[0] != null){
            for(let i = 0; i < choosenTask.length; i++){
                this.taskNames.push(choosenTask[i].taskName)
                var memberIncharge = choosenTask[i].memberIncharged
                this.percentage.push(choosenTask[i].percentage) 
                console.log("MIC", memberIncharge)
                await axios.get("/api/v1/users/"+ memberIncharge).then(response=>{
                    this.memberIncharge.push(response.data.data.username)
                })
            }
        }
      }
  },
  async created(){
      await this.setUpPopUp()
  },
};
</script>

<style>
@import "../assets/styles/report-card.css";

</style>
