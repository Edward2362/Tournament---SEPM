<template>
  <div class="choose_task">
    Choosetask
    <div class="tasks">
      <div class="task_list">
        <ul>
          <li>Frontendsd</li>
          <li>Backend</li>
        </ul>
      </div>
      <div class="percentage">right</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Choosetask",
};
</script>

<style>
.choose_task {
  width: 500px;
  height: 500px;
  margin: auto;
  align-self: center;
  justify-self: center;
  background-color: blue;
}
.tasks {
  display: grid;
  grid-template-columns: 80% 20%;
}
.task_list {
  border: 1px solid red;
}
.percentage {
}
</style>
