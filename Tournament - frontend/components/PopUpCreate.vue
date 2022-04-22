<template>
  <div>
    <div
      class="blur"
      :class="{ 'active-pop-up': isOverlay }"
      @click="bluring"
    ></div>
    <div class="test" :class="{ 'active-pop-up': isOverlay }">
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
      <div class="container">ádasd ádasdasdasdasd</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "PopUpCreate",
  computed: {
    ...mapGetters({
      isOverlay: "document/isOverlay",
    }),
  },
  methods: {
    ...mapMutations({
      bluring: "document/setOverlay",
    }),
  },
};
</script>

<style></style>
