<template>
  <div class="report-body">
    <h2>{{ "Week " + report.week }}</h2>
    <div v-for="task in report.tasks" :key="task._id">
      <h1>
        {{ task.taskName }}
      </h1>
      <p>
        {{ task.memberIncharged }}
      </p>
      <p>
        {{ task.percentage }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReportCard",
  props: ["report"],
  //   methods: {
  //     // chooseBoard(id) {
  //     //   this.$emit("choose-board", id);
  //     // },
  //   },
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
  data() {
    return {
      taskNames: [],
      memberIncharge: [],
      allTasks: [],
      thisWeekTasks: [],
      percentage: [],
    };
  },
  methods: {
    async setUpPopUp() {
      const promises = [];
      for (let i = 0; i < this.report.tasks.length; i++) {
        promises.push(
          axios
            .get("/api/v1/users/" + this.report.tasks[i].memberIncharged)
            .then((response) => {
              console.log("promises? ", response.data.data);
              this.report.tasks[i].memberIncharged = response.data.data.username;
            })
        );
      }
      //           console.log("route, ", this.$route.params.id, " report Id, ", this,report)
      //           //get all task id this week has
      //               this.thisWeekTasks = this.report.tasks
      //               console.log("yeah yeah", response.data.data, " hey hey ", this.report)
      //         console.log("This week task", this.thisWeekTasks , " hey, ", this.report)

      //           //get all task belong to the report

      //             //find a list of choosen task that this week has with task data
      //             var choosenTask = this.allTasks.filter((task)=> this.thisWeekTasks.includes(task._id))
      //         console.log("choosentask", choosenTask)
      //         //if not null => get data to print out
      //         if(choosenTask[0] != null){
      //             for(let i = 0; i < choosenTask.length; i++){
      //                 this.taskNames.push(choosenTask[i].taskName)
      //                 var memberIncharge = choosenTask[i].memberIncharged
      //                 this.percentage.push(choosenTask[i].percentage)
      //                 console.log("MIC", memberIncharge)
      //                 await axios.get("/api/v1/users/"+ memberIncharge).then(response=>{
      //                     this.memberIncharge.push(response.data.data.username)
      //                 })
      //             }
      //         }
      //       }
      await Promise.all(promises);
    },
  },
  async created() {
    await this.setUpPopUp();
  },
};
</script>

<style>
@import "../assets/styles/report-card.css";
</style>
