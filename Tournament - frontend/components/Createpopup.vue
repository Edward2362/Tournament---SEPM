<template>
  <div class="create_project">
    Create project
    <div class="choose_project">
      Trelloasdasdas
      <input
        type="text"
        class="icon"
        value
        placeholder="Password"
        v-model="project_name"
        v-on:change="search()"
      />
    </div>
    <div class="reward_and_boundary">
      <div v-for="(board, index) in info" :key="board.name">
        {{ board.name }} + {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cover",
  data() {
    return {
      project_name: 0,
      info: null,
    };
  },
  methods: {
    async search(e) {
      e.preventDefault();
      axios
        .post("v1/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errormessage = error.response.data.message;
        });
      this.$refs.loginform.reset();
    },
  },
  mounted() {
    axios.get("v1/users/me/projects").then((response) => {
      console.log(response.data);
      this.info = response.data.data;
    });
    console.log(this.info);
  },
};
</script>

<style>
.create_project {
  width: 500px;
  height: 500px;
  margin: auto;
  align-self: center;
  justify-self: center;
  background-color: blue;
}
.choose_project {
  border: 1px solid gray;
  align-content: center;
  justify-content: center;
}
.reward_and_boundary {
  border: 1px solid gray;
}
</style>
