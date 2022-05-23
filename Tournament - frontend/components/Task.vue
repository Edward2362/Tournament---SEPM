<template>
  <div class="task">
    <div class="task-info">
      <div class="member-ava-holder">
        <User :avatar="userAva" />
      </div>
      <p>{{Task.percentage}}%</p>
    </div>
    <div class="task-name">{{Task.taskName}}</div>
  </div>
</template>

<script>
import User from "../components/User.vue";

export default { 
  name: "Task", 
  components: { User } ,
  props: ["Task", "userAva"],

};
</script>

<style>
@import "../assets/styles/task.css";
</style>
