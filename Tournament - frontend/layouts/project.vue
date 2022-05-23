<template>
  <div>
    <AppHeader />
    <div class="project-page">
      <ProjectMenu />
      <div class="project-body">
        <div class="project-title"><h1>{{currentProjectName}}</h1></div>
        <div class="project-sections">
          <nuxt />
          <div class="project-user">
            <div class="project-user-info">
              <h2>{{currentUserName}}</h2>
              <div class="info-contents">
                <div class="content">
                  <p class="label">Points</p>
                  <p class="label-data">{{overallPoint}}</p>
                </div>
                <div class="content">
                  <p class="label">Active tasks</p>
                  <p class="label-data">{{getActiveTask.length}}</p>
                </div>
                <div class="content">
                  <p class="label">Finished tasks</p>
                  <p class="label-data">{{getFinishedTask.length}}</p>
                </div>
                <div class="content">
                  <p class="label">Status</p>
                  <p class="label-data">Rewarded</p>
                </div>
              </div>
            </div>
            <div class="project-user-control">
              <h2>Week {{this.getCurrentWeekReport.weekNum}}</h2>
              <div class="button-control">
                <div v-if="weekOnProcess" class="button" @click="newWeek">
                  <svg
                    width="41"
                    height="51"
                    viewBox="0 0 41 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.62566 49.4991L37.4977 30.2825C40.9918 27.9001 40.9918 22.6591 37.4977 20.2773L9.62566 1.06063C5.57602 -1.71834 0.255859 1.29881 0.255859 6.22241V44.338C0.255859 49.2611 5.57616 52.2782 9.62566 49.4992V49.4991Z"
                      fill="#234C87"
                    />
                  </svg>
                  <p>Start</p>
                </div>
                <div v-else class="button" @click = "endReport">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M44.7366 49.9042H5.16757C2.32534 49.9042 0 47.5788 0 44.737V5.16792C0 2.32534 2.32534 0 5.16757 0H44.7366C47.5788 0 49.9042 2.32534 49.9042 5.16757V44.7366C49.9042 47.5788 47.5788 49.9042 44.7362 49.9042H44.7366Z"
                      fill="#234C87"
                    />
                  </svg>
                  <p>End</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopUpCreate />
  </div>
</template>

<script>
import ProjectMenu from "../components/ProjectMenu.vue";
import AppHeader from "../components/AppHeader";
import PopUpCreate from "../components/PopUpCreate.vue";
import axios from "axios"
import {mapGetters, mapActions} from "vuex"

export default {
  components: { ProjectMenu, AppHeader, PopUpCreate },
  data() {
    return {
      weekOnProcess: true,      
      // tasks : [],
      // currentmember: {},
      project: {},
      report: {},
      members: {},
      currentUserName:"",
      currentProjectName: "",
      reportId: ""
      // allmembers: []
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
      getActiveTask: "tasks/getActiveTasks",
      getFinishedTask: "tasks/getFinishedTasks",
      getCurrentWeekReport: "currentWeekReport/getCurrentWeekReport",
      getUsername: "user/getUsername"
    }),
    overallPoint(){
      if(this.project.members != null){
         var currentUserAsMember = this.project.members.filter(
        (member) => this.getUserId == member.user
        );
        return currentUserAsMember[0].overallPoint
      }

    },
  },

  methods:{
    ...mapActions({
      fetchTasksByProject: "tasks/fetchTasksByProject",
      fetchCurrentProject: "project/fetchCurrentProject",
      createReport: "currentWeekReport/createReport",
      finishTask: "tasks/finishTask",
    }),
    async setUpPage(){
      await this.fetchTasksByProject(this.$route.params.id)
      await this.fetchCurrentProject(this.$route.params.id)
      this.project = this.getCurrentProject
      await this.createReport(this.$route.params.id)
      axios.get("/api/v1/reports/"+this.$route.params.id+"/"+(this.getCurrentWeekReport.weekNum-1)).then(response => {
        if(response.data.data.end == false){
          //tuần đang tiếp tục (chưa end)
          this.weekOnProcess = false
          this.reportId = response.data.data._id
        }
        else{
          //tuần đã end và sang tuần mới
          this.weekOnProcess = true
        }
      })
    },
    async newWeek(){
        console.log(this.getCurrentWeekReport.task)
      await axios.post("/api/v1/reports/" + this.$route.params.id, {
        projectId: this.$route.params.id,
        tasks: this.getCurrentWeekReport.task,
        week: this.getCurrentWeekReport.weekNum,
        end: false}).then(response => {
          this.report = response.data.data
          console.log(response.data.data)
        })  
    },
    async endReport(){
      console.log(this.report)
      var currentOverallPoint = 0
      axios.post("/api/v1/reports/" + this.$route.params.id + "/" + this.report._id, {
        end: true
      }).then(response => {
        console.log("report, ", response.data)
        this.weekOnProcess = true
      })
      console.log("report" ,this.report)
      for(let i = 0; i < this.report.tasks.length; i++){
        var currentOverallPoint = 0
        this.finishTask({taskId: this.report.tasks[i], projectId: this.$route.params.id})
        var choosenTask = this.getTasks.filter((task) => task._id == this.report.tasks[i])
        var memberlist = []
        await axios.get("/api/v1/projects/" + this.$route.params.id + "/members").then(response=> {
          memberlist = response.data.data
        })
        var choosenMember = []
        choosenMember = memberlist.filter((member) => member.user == choosenTask[0].memberIncharged)
        await axios.get("/api/v1/members/" + choosenMember[0]._id).then(response => {
          currentOverallPoint = response.data.data.overallPoint
          console.log(currentOverallPoint)
        })
        await axios.patch("/api/v1/members/" + choosenMember[0]._id, {
          overallPoint: currentOverallPoint + choosenTask[0].percentage
        }).then(response => {
          console.log(response.data.data.overallPoint)
        })
        location.reload()
        
      }
    }
  },
  async created(){
    await this.setUpPage()
    this.currentUserName = this.getUsername,
    this.currentProjectName = this.getCurrentProject.name
    // console.log("new 123", this.getMembers)
  }
};
</script>

<style>
@import "../assets/styles/project.css";
</style>
