<template>
  <div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>hello {{ this.$route.params.id }}</div>
  </div>
</template>

<script>
export default {
  name: "PopUpCreate",
  data() {
    return {
      boardfromtrello: {
        value: null,
        isValid: false,
      },
      penaltyBoundary: 0,
      choosenBoardId: "",
      rewardBoundary: 0,
      trelloBoard: {
        id: null,
        name: null,
      },
      newProjectId: "",
      boards: [],
      members: [],
      //test
    };
  },
};
</script>

<style></style>
