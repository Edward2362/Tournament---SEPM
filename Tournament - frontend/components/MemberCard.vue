<template>
  <div class="trello-board-card" @click="SendMemberId(Member._id)">
    <h2>{{ Member.username }}</h2>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MemberCard",
  props: ["Member"],
data(){
    
},
  methods: {
    SendMemberId(MemberId) {
      this.$emit("MemberId", MemberId );
    },
  }
};
</script>

<style>
@import "../assets/styles/trello-card.css";
</style>
