<template>
  <div class="project-content">
    <h2 class="section-head">Team</h2>
    <div class="section-body">
      <Tasks
        v-for="List in dividedByList"
        :key="List.memberId"
        :listOfTasks="List"
      />
    </div>
    <ChooseTask />
    <CoverTask />
    <!-- <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>this is office</div>
    <div>hello {{ this.$route.name }}</div>
    <div>hello {{ this.$route.params.id }}</div>
    <div>
        <AddTasks
        v-for="task in newtasks"
        :key="task.id"
        :task="task"
        @AddTask="createNewTask"
        />
    </div>
    <div>
        Percentage: <input type="text" name="Percentage" placeholder="Percentage" v-model = "percentage"><br>
    </div>
    <div>
      <CoverCard
        v-for="task in activeTasks"
        :key="task.id"
        :task="task"
        @CoverTask="Cover"
        />
     <li v-for="task in activeTasks" :key ="task._id" >
        {{task._id}}
      </li> 
    </div> -->
  </div>
</template>

<script>
import Tasks from "../../../components/Tasks.vue";
import ChooseTask from "../../../components/ChooseTask.vue";
import CoverTask from "../../../components/CoverTask.vue";

// export default {
//   components: { Tasks },
//   layout: "project",
// };
import AddTasks from "../../../components/AddTasks.vue";
import CoverCard from ".../../../components/CoverCard.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  layout: "project",
  data() {
    return {
      alltask: [],
      trelloTaskId: "",
      percentage: "",
      taskName: "",
      oldtasks: [],
      activeTasks: [],
      currentProject: null,
    };
  },
  computed: {
    ...mapGetters({
      getUserToken: "user/getUserToken",
      getUserTrelloId: "user/getUserTrelloId",
      getMemberWithProjectId: "projects/getMemberWithProjectId",
      getUserId: "user/getUserId",
      getTasks: "tasks/getTasks",
      getCurrentProject: "project/getCurrentProject",
      getTrelloTaskId: "tasks/getTrelloTaskId",
      getActiveTasks: "tasks/getActiveTasks",
    }),
    // newtasks() {
    //   if(this.alltask.length > 0){
    //     var remainingTasks = this.alltask.filter(
    //       (task) => !this.oldtasks.includes(task.id)
    //     );
    //     return remainingTasks
    //   }
    //   return this.alltask.filter(
    //     (task) => !this.getTrelloTaskId.includes(task.trelloTaskId)
    //   );
    // },
    memberActiveTasks() {
      if (this.activeTasks.length > 0) {
        var remainingActiveTasks = this.activeTasks.filter(
          (task) => task.memberIncharged == this.getUserId
        );
        return remainingActiveTasks;
      }
      return null;
    },
    dividedByList() {
      const listOfList = [];
      console.log(this.currentProject);
      if (this.currentProject != null && this.currentProject.members != null) {
        for (let i = 0; i < this.currentProject.members.length; i++) {
          // const listByUserId = []
          const combine = {};
          const listofTasks = [];
          if (this.activeTasks != null) {
            for (let task of this.activeTasks) {
              if (task.memberIncharged == this.currentProject.members[i].user) {
                listofTasks.push(task);
              }
            }
            combine.task = listofTasks;
            combine.memberId = this.currentProject.members[i].user;
            // listByUserId.push(combine)
            listOfList.push(combine);
            console.log("list: ", listOfList);
          }
        }
      }
      return listOfList;
    },
  },
  methods: {
    async getalltasks() {
      await axios
        .get(
          "https://api.trello.com/1/boards/" +
            this.getCurrentProject.trelloBoardId +
            "/cards?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
            this.getUserToken
        )
        .then((response) => {
          console.log("all task ,", response.data);
          this.alltask = response.data;
        });
      this.oldtasks = this.getTrelloTaskId;
      this.activeTasks = this.getActiveTasks;
    },
    async createNewTask(id) {
      console.log(id);
      await axios
        .get(
          "https://api.trello.com/1/boards/" +
            this.getCurrentProject.trelloBoardId +
            "/cards/" +
            id +
            "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
            this.getUserToken
        )
        .then((response) => {
          this.taskName = response.data.name;
        });
      const memberIncharged = {};
      memberIncharged["_id"] = this.getUserId;

      await axios
        .post("/api/v1/tasks/" + this.$route.params.id, {
          projectId: this.$route.params.id,
          trelloTaskId: id,
          taskName: this.taskName,
          memberIncharged: memberIncharged,
          percentage: this.percentage,
        })
        .then((response) => {
          console.log(response.data.data);
        });
    },

    async Cover({ taskId, memberId }) {
      const member = {};
      member["_id"] = memberId;
      await axios.patch(
        "/api/v1/tasks/" + this.$route.params.id + "/" + taskId,
        {
          memberIncharged: member,
        }
      );
    },
  },
  async created() {
    this.currentProject = this.getCurrentProject;
    await this.getalltasks();
    console.log("current P: ", this.currentProject);
    console.log(this.getTrelloTaskId);
    console.log(this.newtasks);
    console.log(this.dividedByList);
  },
};
</script>

<style></style>
