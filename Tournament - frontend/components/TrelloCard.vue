<template>
  <div class="trello-board-card" @click="chooseBoard(board.id)">
    <h2>{{ board.name }}</h2>
  </div>
</template>

<script>
export default {
  name: "TrelloCard",
  props: ["board"],
  methods: {
    chooseBoard(id) {
      this.$emit("choose-board", id);
    },
  },
};
</script>

<style>
@import "../assets/styles/trello-card.css";
</style>
