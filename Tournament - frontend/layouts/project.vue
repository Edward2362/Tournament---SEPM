<template>
  <div>
    <AppHeader />
    <div class="project-page">
      <ProjectMenu />
      <div class="project-body">
        <div class="project-title"><h1>Tournament</h1></div>
        <div class="project-sections">
          <nuxt />
          <div class="project-user">
            <div class="project-user-info">
              <h2>Quang</h2>
              <div class="info-contents">
                <div class="content">
                  <p class="label">Point</p>
                  <p class="label-data">2362</p>
                </div>
                <div class="content">
                  <p class="label">Active tasks</p>
                  <p class="label-data">2</p>
                </div>
                <div class="content">
                  <p class="label">Finished tasks</p>
                  <p class="label-data">2</p>
                </div>
                <div class="content">
                  <p class="label">Status</p>
                  <p class="label-data">Rewarded</p>
                </div>
              </div>
            </div>
            <div class="project-user-control">
              <h2>Week 1</h2>
              <div class="button-control">
                <div v-if="weekOnProcess" class="button">
                  <svg
                    width="41"
                    height="51"
                    viewBox="0 0 41 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.62566 49.4991L37.4977 30.2825C40.9918 27.9001 40.9918 22.6591 37.4977 20.2773L9.62566 1.06063C5.57602 -1.71834 0.255859 1.29881 0.255859 6.22241V44.338C0.255859 49.2611 5.57616 52.2782 9.62566 49.4992V49.4991Z"
                      fill="#234C87"
                    />
                  </svg>
                  <p>Start</p>
                </div>
                <div v-else class="button">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M44.7366 49.9042H5.16757C2.32534 49.9042 0 47.5788 0 44.737V5.16792C0 2.32534 2.32534 0 5.16757 0H44.7366C47.5788 0 49.9042 2.32534 49.9042 5.16757V44.7366C49.9042 47.5788 47.5788 49.9042 44.7362 49.9042H44.7366Z"
                      fill="#234C87"
                    />
                  </svg>
                  <p>End</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopUpCreate />
  </div>
</template>

<script>
import ProjectMenu from "../components/ProjectMenu.vue";
import AppHeader from "../components/AppHeader";
import PopUpCreate from "../components/PopUpCreate.vue";

export default {
  components: { ProjectMenu, AppHeader, PopUpCreate },
  data() {
    return {
      weekOnProcess: true,
    };
  },
};
</script>

<style>
@import "../assets/styles/project.css";
</style>
