<template>
  <div>
    <div
      class="blur"
      :class="{ 'active-pop-up': isOverlayCoverTask }"
      @click="bluring"
    ></div>
    <div
      class="container-pop-up-office"
      :class="{ 'active-pop-up': isOverlayCoverTask }"
    >
      <div class="header-pop-up-office">
        <div class="title"><h1>Cover Task</h1></div>
        <div class="off-pop-up-office" @click="bluring">
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
      <div class="body-pop-up-office">
        <div class="tasks-list">
          <div
            class="cover-task"
            :class="{ 'task-chosen': chosenTask == task.id }"
            v-for="task in tasks"
            :key="task.id"
            @click="chooseTask(task.id)"
          >
            <div class="task-cover-name">{{ task.name }}</div>
            <div class="task-cover-percentage">{{ task.percentage + "%" }}</div>
          </div>
        </div>
        <div
          class="members-board"
          :class="{ 'percentage-off': chosenTask == '' }"
        >
          <div class="board-name">Members</div>
          <div class="members-list">
            <div
              class="member-name-office"
              :class="{ 'task-chosen': chosenMember == member.id }"
              v-for="member in members"
              :key="member.id"
              @click="chooseMember(member.id)"
            >
              {{ member.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="confirm-btn-office">
        <button>Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoverTask",
  data() {
    return {
      chosenTask: "",
      chosenMember: "",
      //test
      tasks: [
        { id: "1", name: "Quang", percentage: 90 },
        { id: "2", name: "Tina", percentage: 20 },
        { id: "3", name: "Foxes", percentage: 50 },
        { id: "4", name: "Ed", percentage: 30 },
      ],
      members: [
        { id: "1", name: "Quang" },
        { id: "2", name: "Tina" },
        { id: "3", name: "Foxes" },
        { id: "4", name: "Ed" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isOverlayCoverTask: "document/isOverlayCoverTask",
    }),
  },
  methods: {
    // ...mapActions({ changeTrelloId: "user/changeTrelloId" }),
    ...mapMutations({
      bluring: "document/setOverlayCoverTask",
    }),
    chooseTask(id) {
      this.chosenTask = id;
    },
    chooseMember(id) {
      this.chosenMember = id;
    },
  },
};
</script>

<style>
@import "../assets/styles/pop-up-office.css";
</style>
