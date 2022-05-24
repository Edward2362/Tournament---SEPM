<template>
  <div class="project-content">
    <h2 class="section-head">Setting</h2>
    <div>
      <input
        v-if="admin"
        type="button"
        @click="endProject()"
        value="End Project!"
      />
      <form>
        Reward:
        <input
          type="text"
          name="Reward"
          :placeholder="[[reward]]"
          v-model="reward"
        /><br />
        Submit: <input type="button" @click="changeReward()" value="Submit" />
      </form>
      <div v-if="projectEnded">
        <h2>Punished member:</h2>
        <p v-for="punishedmember in punished" :key="punishedmember">
          {{ punishedmember }}
        </p>
        <h2>Rewarded member:</h2>
        <p v-for="rewardedmember in rewarded" :key="rewardedmember">
          {{ rewardedmember }}
        </p>
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
      reward: "",
      memberId: "",
      admin: false,
      projectEnded: false,
      punished: [],
      rewarded: [],
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
      getCurrentWeekReport: "currentWeekReport/getCurrentWeekReport",
    }),
  },
  methods: {
    async endProject() {
      axios
        .patch("/api/v1/projects/" + this.$route.params.id, {
          finished: true,
        })
        .then((response) => {
          console.log(response.data.data);
          this.projectEnded = true;
        });
    },
    async changeReward() {
      axios
        .patch("/api/v1/members/" + this.memberId, {
          desiredReward: this.reward,
        })
        .then((response) => console.log(response.data.data));
    },
    async setUpSettingPage() {
      console.log("da run");
      console.log(this.getUserId);
      var currentmemberId = this.getCurrentProject.members;
      var userId = this.getUserId;
      for (let i = 0; i < currentmemberId.length; i++) {
        if (currentmemberId[i].user == userId) {
          (this.memberId = currentmemberId._id),
            (this.reward = currentmemberId.desiredReward);
        }
        this.getReward(currentmemberId[i]);
        this.getPunished(currentmemberId[i]);
      }

      if (this.getCurrentProject.admin == this.getUserId) {
        this.admin = true;
      }
      console.log("member Id: ", this.memberId, "reward ", this.rewarded);
    },
    async getReward(currentmemberId) {
      if (
        currentmemberId.overallPoint >=
        ((this.getCurrentWeekReport.weekNum - 1) *
          100 *
          this.getCurrentProject.upperBoundary) /
          100
      ) {
        console.log(
          (this.getCurrentWeekReport.weekNum - 1) * 100 +
            this.getCurrentProject.upperBoundary
        );
        await axios
          .get("/api/v1/users/" + currentmemberId.user)
          .then((response) => {
            console.log("1", response.data.data);
            this.rewarded.push(response.data.data.username);
          });
      }
    },
    async getPunished(currentmemberId) {
      if (
        currentmemberId.overallPoint <
        ((this.getCurrentWeekReport.weekNum - 1) *
          100 *
          this.getCurrentProject.lowerBoundary) /
          100
      ) {
        console.log(
          (this.getCurrentWeekReport.weekNum - 1) * 100 -
            this.getCurrentProject.lowerBoundary
        );

        await axios
          .get("/api/v1/users/" + currentmemberId.user)
          .then((response) => {
            console.log("2", response.data.data);

            this.punished.push(response.data.data.username);
          });
      }
    },
  },
  async created() {
    await this.setUpSettingPage();
  },
};
</script>

<style></style>
