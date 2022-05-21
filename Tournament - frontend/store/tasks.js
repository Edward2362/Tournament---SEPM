import axios from "axios";
import createPersistedState from 'vuex-persistedstate';

function getPlugins() {
  let plugins = []

  if (process.browser) {
    plugins = createPersistedState({
      key: "tasks",
      storage: window.sessionStorage,
    })
  }
  return plugins;
};
export const plugins = getPlugins();


export const state = () => ({
  tasks: [],
});

export const getters = {
  getTasks(state) {
    return state.tasks
  },
  getTrelloTaskId(state) {
    var trelloTaskId = []

      for (let i = 0; i < state.tasks.length; i++) {
        trelloTaskId.push(state.tasks[i].trelloTaskId)
      }
    console.log("trello task Id getter", trelloTaskId)
    return trelloTaskId
  },
  getActiveTasks(state) {
    var trelloTaskId = []
    if (state.tasks.length > 0) {
      trelloTaskId = state.tasks.filter((task) => task.finished === false);
    }
    return trelloTaskId
  },  
  getFinishedTasks(state) {
    var trelloTaskId = []
    if (state.tasks.length > 0) {
      trelloTaskId = state.tasks.filter((task) => task.finished === true);
    }
    return trelloTaskId
  },  
};

export const actions = {
  fetchTasksByProject({ commit }, projectId) {
    axios.get("/api/v1/tasks/" + projectId).then((response) => {
      commit("setTasks", response.data.data);
    });
  },
  createTask({ commit }, task) {
    commit("createTask", task)
  },
  finishTask({ commit }, { taskId, projectId }) {
    console.log("finish task, ", taskId)
    axios.patch("/api/v1/tasks/" + projectId + "/" + taskId, {
      finished: true
    }),
      commit("finishTask", taskId)
  }
};

export const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  createTask: (state, task) => (state.tasks.unshift(task)),
  finishTask: (state, taskId) => (state.tasks.filter((task) => task._id == taskId))
};
