<template>
  <div class="trello-board-card" @click="ChooseTask()">
    <h2>{{ task.taskName }}</h2>
    <div v-if="clicked">
      <div>
          <MemberCard
        v-for="member in Members"
        :key="member._id"
        :Member="member"
        @MemberId="ConfirmCoverMember"
        />
      </div>
      <button @click="CoverTask(task._id)">HEYHEYHEY</button>
    </div>
  </div>
  
</template>

<script>
import MemberCard from "../components/MemberCard.vue";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "CoverCard",
  props: ["task"],
data(){
    return{
        clicked: false,
        allMember: [],
        MemberId: "",
        userIds: [],
        Members: []
    }
},
computed:{
    ...mapGetters({
    //   isOverlay: "document/isOverlay",
    //   getProjectId: "projects/getProjectId",
      userId: "user/getUserId",
    //   getUserToken: "user/getUserToken",
    //   getUser: "user/getUser",
    //   getUserTrelloId: "user/getUserTrelloId",
    }),
},
  methods: {
    ChooseTask(){
      this.clicked = true;
      },
    CoverTask(taskId) {
      this.$emit("CoverTask", {taskId: taskId, memberId: this.MemberId});
      console.log("taskId: ", taskId)
        console.log("member: ", this.MemberId)

    },
    ConfirmCoverMember(MemberId){
        console.log(MemberId)
        this.MemberId = MemberId
    },
    async setUpComponent(){
        await axios.get("/api/v1/projects/" + this.$route.params.id + "/members").then(response=> {
            this.allMember = response.data.data
        })
        for(let member of this.allMember){
            this.userIds.push(member.user)
        }
        const promises = []
        for (let userId of this.userIds) {
        if (userId != this.userId ) {
            promises.push(axios.get("/api/v1/users/" + userId).then(response => {
                this.Members.push(response.data.data)
            }))
        }
        }
    await Promise.all(promises)
    }
  },

  async created(){
      await this.setUpComponent()
  },
};
</script>

<style>
@import "../assets/styles/trello-card.css";
</style>
