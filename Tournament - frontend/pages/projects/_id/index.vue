<template>
  <div class="project-content">
    <h2 class="section-head">Ranking</h2>
    <div class="section-body">
      <div class="ranking">
        <div class="rank-position">
          <div class="rank" id="rank-2">
            <div v-if="top3Member[1] != null" class="rank-owner">
              <div class="owner-name">{{ top3Member[1].username }}</div>
              <div class="owner-point">{{ top3Member[1].overallPoint }}</div>
            </div>
            <div class="rank-title">2</div>
          </div>
        </div>
        <div class="rank-position">
          <div class="rank" id="rank-1">
            <div v-if="top3Member[0] != null" class="rank-owner">
              <div class="owner-name">{{ top3Member[0].username }}</div>
              <div class="owner-point">{{ top3Member[0].overallPoint }}</div>
            </div>
            <div class="rank-title">1</div>
          </div>
        </div>
        <div class="rank-position">
          <div class="rank" id="rank-3">
            <div v-if="top3Member[2] != null" class="rank-owner">
              <div class="owner-name">{{ top3Member[2].username }}</div>
              <div class="owner-point">{{ top3Member[2].overallPoint }}</div>
            </div>
            <div class="rank-title">3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  layout: "project",
  data() {
    return {
      weekOnProcess: true,
      tasks: [],
      currentMember: {},
      currentProject: null,
      project: {},
      allmembers: [],
      top3: [
        { id: 1, username: "Quang", overallPoint: 400 },
        { id: 2, username: "Tuan", overallPoint: 200 },
        { id: 3, username: "Minh", overallPoint: 100 },
      ],
      listTop3: [],
    };
  },
  computed: {
    ...mapGetters({
      getUserToken: "user/getUserToken",
      getUserTrelloId: "user/getUserTrelloId",
      getMemberWithProjectId: "projects/getMemberWithProjectId",
      getUserId: "user/getUserId",
      getTasks: "tasks/getTasks",
      getMembers: "project/getMembers",
      getCurrentProject: "project/getCurrentProject",
    }),
    top3Member() {
      if (this.listTop3 != null) {
        return this.listTop3;
      } else {
        return this.top3;
      }
    },
  },
  methods: {
    ...mapActions({
      fetchTasksByProject: "tasks/fetchTasksByProject",
      fetchCurrentProject: "project/fetchCurrentProject",
    }),
    async setUpIndexPage() {
      // await axios
      //   .get(
      //     "https://api.trello.com/1/members/" +
      //       this.getUserTrelloId +
      //       "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
      //       this.getUserToken
      //   )
      //   .then((response) => {
      //     this.currentMember = response.data;
      //   });
      // .map(m => new Object({name: o.name, id: o.id}))
      for (let i = 0; i < this.currentMember.length; i++) {
        let member = {};
        await axios
          .get("/api/v1/users/" + this.currentMember[i].user)
          .then((response) => {
            member.username = response.data.data.username;
          });
        member.overallPoint = this.currentMember[i].overallPoint;
        console.log("member day ne", member);
        this.listTop3.push(member);
      }
      console.log("hey", this.top3);
      console.log("hey 2", this.listTop3);
    },

    async membersOfProject(id) {
      await axios
        .get("/api/v1/projects/" + id + "/members?sort=-overallPoint")
        .then((response) => {
          console.log("allmember ", response.data.data);
          this.currentMember = response.data.data;
        });
    },

    // compare( a, b ) {
    //   if ( a.overallPoint < b.overallPoint ){
    //     return -1;
    //   }
    //   if ( a.overallPoint > b.overallPoint ){
    //     return 1;
    //   }
    //   return 0;
    //   },
  },
  async created() {
    this.currentProject = this.getCurrentProject;
    await this.membersOfProject(this.$route.params.id);
    await this.setUpIndexPage();
    console.log("chac la kiem dc r", this.currentMember);
  },
};
</script>

<style>
@import "../../../assets/styles/dashboard.css";
</style>
