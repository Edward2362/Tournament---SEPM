<template>
  <div class="project-content">
    <div>this is report</div>
    <div>this is report</div>
    <div>this is report</div>
    <div>this is report</div>
    <div>this is report</div>
    <div>this is report</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>
      <li v-for="report in reports" :key="report._id">
        {{ report._id }}
      </li>
    </div>
    <div>
      <ReportCard
        v-for="report in reportPlusTask"
        :key="report._id"
        :report="report"
      />
    </div>
  </div>
</template>

<script>
import ReportCard from "../../../components/ReportCard.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  layout: "project",
  data() {
    return {
      reports: [],
      allTasks: [],
      reportPlusTask: [],
    };
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
    memberInChargeName() {},
  },
  methods: {
    async setUpPage() {
      console.log("da run");
      await axios
        .get("/api/v1/reports/" + this.$route.params.id)
        .then((response) => {
          this.reports = response.data.data;
          console.log("report list: ", response.data.data);
        });
      await axios.get("/api/v1/tasks/"+ this.$route.params.id).then(response =>{
        this.allTasks = response.data.data
      })
      this.reportPlusTask = this.reports.map(report => {
        return {
          ...report,
          tasks: report.tasks.map(taskId => (
            this.allTasks.find(t => taskId === t._id)
          
          ))
        }
      })
    },
    // async fetchallReport(){
    //   //getall task
    //   await axios.get("/api/v1/tasks/"+ this.$route.params.id).then(response =>{
    //     this.allTasks = response.data.data
    //   })
    //   console.log("all task, ", this.allTasks)

    // },
  },
  async created() {
    await this.setUpPage();
    // await this.fetchallReport()
  },
  
};
</script>

<style></style>
