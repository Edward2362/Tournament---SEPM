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
        v-for="report in reports"
        :key="report._id"
        :reportId="report.week"
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
    },
  },
  async created() {
    await this.setUpPage();
  },
};
</script>

<style></style>
