<template>
  <div>
    <div
      class="blur"
      :class="{ 'active-pop-up': isOverlayCreate }"
      @click="bluring"
    ></div>
    <div class="container-pop-up" :class="{ 'active-pop-up': isOverlayCreate }">
      <div class="header-pop-up">
        <div class="title"><h1>Create Project</h1></div>
        <div class="off-pop-up" @click="bluring">
          <svg
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5213 0C4.71463 0 0 4.71475 0 10.5213C0 16.3278 4.71475 21.0425 10.5213 21.0425C16.3278 21.0425 21.0425 16.3278 21.0425 10.5213C21.0425 4.71475 16.3278 0 10.5213 0ZM10.5213 0.678972C15.9612 0.678972 20.3637 5.08147 20.3637 10.5214C20.3637 15.9614 15.9612 20.3639 10.5213 20.3639C5.08129 20.3639 0.678791 15.9614 0.678791 10.5214C0.678791 5.08147 5.08129 0.678972 10.5213 0.678972ZM6.75609 6.43797C6.74165 6.44057 6.72768 6.44412 6.71371 6.44862C6.58706 6.47158 6.4843 6.56415 6.44832 6.68773C6.41234 6.81131 6.44951 6.9446 6.54396 7.03195L10.0333 10.5213L6.54396 14.0106C6.47933 14.0753 6.44287 14.1631 6.44287 14.2547C6.44287 14.3461 6.47933 14.4339 6.54396 14.4986C6.6086 14.5632 6.69643 14.5997 6.78781 14.5997C6.87943 14.5997 6.96726 14.5632 7.03189 14.4986L10.5212 11.0092L14.0106 14.4986C14.0752 14.5632 14.163 14.5997 14.2547 14.5997C14.346 14.5997 14.4339 14.5632 14.4985 14.4986C14.5631 14.4339 14.5996 14.3461 14.5996 14.2547C14.5996 14.1631 14.5631 14.0753 14.4985 14.0106L11.0092 10.5213L14.4985 7.03195C14.6081 6.92992 14.6377 6.76822 14.5719 6.63399C14.5058 6.49952 14.3598 6.42424 14.212 6.44862C14.1361 6.4569 14.065 6.49052 14.0106 6.54402L10.5212 10.0334L7.03188 6.54402C6.96086 6.4685 6.85929 6.42944 6.75608 6.43796L6.75609 6.43797Z"
              fill="#234C87"
            />
          </svg>
        </div>
      </div>
      <div class="body-pop-up">
        <div class="trello-section">
          <div class="trello-icon-pop-up">
            <div class="holder-icon-pop-up">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="background"
                  d="M22.4388 0H0.00657579C0.00294408 0 0 0.00294408 0 0.00657579V22.4388C0 22.4424 0.00294408 22.4453 0.00657579 22.4453H22.4388C22.4424 22.4453 22.4453 22.4424 22.4453 22.4388V0.00657579C22.4453 0.00294408 22.4424 0 22.4388 0Z"
                  fill="#0079BF"
                />
                <path
                  d="M17.2296 4.16455H13.4595C12.9026 4.16455 12.4512 4.61598 12.4512 5.17284V11.3979C12.4512 11.9548 12.9026 12.4062 13.4595 12.4062H17.2296C17.7864 12.4062 18.2379 11.9548 18.2379 11.3979V5.17284C18.2379 4.61598 17.7864 4.16455 17.2296 4.16455Z"
                  fill="#FAFCFF"
                />
                <path
                  d="M9.03036 4.16455H5.26024C4.70338 4.16455 4.25195 4.61598 4.25195 5.17284V16.1325C4.25195 16.6893 4.70338 17.1408 5.26024 17.1408H9.03036C9.58722 17.1408 10.0386 16.6893 10.0386 16.1325V5.17284C10.0386 4.61598 9.58722 4.16455 9.03036 4.16455Z"
                  fill="#FAFCFF"
                />
              </svg>
              <p>Trello</p>
            </div>
          </div>
          <div class="trello-search-box">
            <div class="search-holder-pop-up"><SearchBar /></div>
          </div>
          <div class="trello-scroll-body">
            <div class="trello-boards">
              <TrelloCard
                v-for="board in newBoards"
                :key="board.id"
                :board="board"
                @choose-board="chooseBoard"
              />
            </div>
          </div>
        </div>
        <div class="transition-icon">
          <svg
            width="27"
            height="24"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6572 3.6824L15.6444 22.7798C14.698 24.4067 12.289 24.4067 11.3428 22.7798L0.32991 3.6824C-0.616413 2.0555 0.588095 0 2.48077 0H24.5922C26.4854 0 27.6035 2.05495 26.6572 3.6824Z"
              fill="url(#paint0_linear_242_562)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_242_562"
                x1="13.5"
                y1="0"
                x2="13.5"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0079BF" />
                <stop offset="0.625" stop-color="#234C87" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="tournament-section">
          <div class="tour-icon-pop-up">
            <div class="holder-icon-pop-up">
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.661 3.34343C21.661 2.60148 21.0595 2 20.3176 2H5.64852C4.90656 2 4.30508 2.60148 4.30508 3.34343H12.2288H13H21.661Z"
                  fill="#234C87"
                />
                <path
                  d="M13 3.34343V16.7778C13.26 16.7778 13.5142 16.77 13.7627 16.7547V4.10615C13.7627 3.68491 13.4212 3.34343 13 3.34343Z"
                  fill="#234C87"
                />
                <path
                  d="M13 16.7778V3.34343H12.2288V16.7542C12.4801 16.7698 12.7371 16.7778 13 16.7778Z"
                  fill="#234C87"
                />
                <path
                  d="M13 23V16.7778C12.7371 16.7778 12.4801 16.7698 12.2288 16.7542V23H13Z"
                  fill="#234C87"
                />
                <path
                  d="M13 23C13.4212 23 13.7627 22.6585 13.7627 22.2373V16.7547C13.5142 16.77 13.26 16.7778 13 16.7778V23Z"
                  fill="#234C87"
                />
                <path
                  d="M8.66102 23H12.2288M17.2881 23H13M13 3.34343V16.7778M13 3.34343H21.661M13 3.34343H12.2288M13 3.34343V3.34343C13.4212 3.34343 13.7627 3.68491 13.7627 4.10615V16.7547M13 23V16.7778M13 23H12.2288M13 23V23C13.4212 23 13.7627 22.6585 13.7627 22.2373V16.7547M13 16.7778C12.7371 16.7778 12.4801 16.7698 12.2288 16.7542M13 16.7778C13.26 16.7778 13.5142 16.77 13.7627 16.7547M4.30508 3.34343V3.34343C3.03202 3.34343 1.99168 4.37978 2.16684 5.64073C2.79529 10.1649 5.34474 16.3259 12.2288 16.7542M4.30508 3.34343V3.34343C4.30508 2.60148 4.90656 2 5.64852 2H20.3176C21.0595 2 21.661 2.60148 21.661 3.34343V3.34343M4.30508 3.34343H12.2288M21.661 3.34343V3.34343C22.9528 3.34343 24.0086 4.39471 23.8285 5.67389C23.192 10.1968 20.6364 16.332 13.7627 16.7547M12.2288 3.34343V16.7542M12.2288 23V16.7542"
                  stroke="#234C87"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
              <p>Tournament</p>
            </div>
          </div>
          <div v-if="trelloBoard.id != null" class="tour-body">
            <div class="tour-project-info">
              <p>
                Project <span class="project-name">{{ trelloBoard.name }}</span>
              </p>
              <div class="boundaries">
                <div class="boundary penalty">
                  <p>Penalty boundary</p>
                  <input type="text" v-model="penaltyBoundary" />
                </div>
                <div class="boundary reward">
                  <p>Reward boundary</p>
                  <input type="text" v-model="rewardBoundary" />
                </div>
              </div>
            </div>
            <div class="vertical-line-pop-up"></div>
            <div class="tour-project-members">
              <p>Members</p>
              <div class="member-list">
                <div class="member" v-for="member in members" :key="member.id">
                  {{ member.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="tour-body-inavailable" v-else>
            Please choose the Trello board
          </div>
        </div>
        <div class="confirm-btn">
          <button v-on:click="AddProjecToDb">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrelloCard from "../components/TrelloCard.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
import axios from "axios";

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
  computed: {
    ...mapGetters({
      isOverlayCreate: "document/isOverlayCreate",
      getProjectId: "projects/getProjectId",
      userId: "user/getUserId",
      getUserToken: "user/getUserToken",
      getUser: "user/getUser",
      getUserTrelloId: "user/getUserTrelloId",
    }),
    newBoards() {
      return this.boards.filter(
        (board) => !this.getProjectId.includes(board.id)
      );
    },
  },
  // emits: []
  methods: {
    // ...mapActions({ changeTrelloId: "user/changeTrelloId" }),
    ...mapMutations({
      bluring: "document/setOverlayCreate",
    }),
    ...mapActions({
      createNewProject: "projects/createNewProject",
    }),
    async chooseBoard(id) {
      console.log(id);
      this.choosenBoardId = id;
      this.getoneProject();
      this.getMember();
    },
    async getTrelloBoards() {
      await axios
        .get(
          "https://api.trello.com/1/members/" +
            this.getUserTrelloId +
            "/boards?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
            this.getUserToken
        )
        .then((response) => {
          this.boards = response.data;
        });
    },

    async getoneProject() {
      await axios
        .get(
          "https://api.trello.com/1/boards/" +
            this.choosenBoardId +
            "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
            this.getUserToken
        )
        .then((response) => {
          this.trelloBoard["id"] = response.data["id"];
          this.trelloBoard["name"] = response.data["name"];
        });

      //make the lower section appear
    },
    async AddProjecToDb() {
      await this.createNewProject({
        name: this.trelloBoard["name"],
        trelloId: this.trelloBoard["id"],
        rewardBoundary: this.rewardBoundary,
        penaltyBoundary: this.penaltyBoundary,
        memberTrelloIds: this.members,
      });
      this.bluring();
    },
    async getMember() {
      var members = [];
      var memberName = [];

      await axios
        .get(
          "https://api.trello.com/1/boards/" +
            this.choosenBoardId +
            "/memberships?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
            this.getUserToken
        )
        .then((response) => {
          members = response.data;
        });
      for (let i = 0; i < members.length; i++) {
        await axios
          .get(
            "https://api.trello.com/1/members/" +
              members[i].idMember +
              "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
              this.getUserToken
          )
          .then((response) => {
            let readingMember = {
              id: response.data.id,
              name: response.data.fullName,
            };
            memberName.push(readingMember);
          });
      }

      this.members = memberName;
      console.log(this.members);
    },
  },

  async created() {
    await this.getTrelloBoards();
    console.log(this.boards);
  },
};
</script>

<style>
@import "../assets/styles/pop-up-create.css";
</style>
