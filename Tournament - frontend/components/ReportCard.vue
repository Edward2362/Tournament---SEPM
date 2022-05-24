<template>
  <div class="report-body">
    <h2>{{ "Week " + report.week }}</h2>
    <div v-for="task in report.tasks" :key="task._id">
      <div class="report-task-info">
        <div class="report-task">
          <p>
            {{ task.taskName }}
          </p>
        </div>
        <div class="vertical-line-report"></div>
        <div class="report-task-member">
          <p>
            {{ task.percentage + " point for " + task.memberIncharged }}
          </p>
        </div>
      </div>
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
              this.report.tasks[i].memberIncharged =
                response.data.data.username;
            })
        );
      }
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
