import axios from "axios";
import createPersistedState from 'vuex-persistedstate';

function getPlugins() {
  let plugins = []

  if (process.browser) {
    plugins = createPersistedState({
      key: "CurrentWeekReport",
      storage: window.sessionStorage,
    })
  }
  return plugins;
};
export const plugins = getPlugins();


export const state = () => ({
  currentWeekReport: {},
});

export const getters = {
  getCurrentWeekReport(state) {
    return state.currentWeekReport;
  },
  // getMembers(state) {
  //   return state.project.members
  // }
};

export const actions = {
    async createReport({ commit, rootGetters }, currentProjectId) {
        var tasklist = []
        console.log("get", rootGetters["tasks/getActiveTasks"])
        var week = 1;
        console.log("tasklist", rootGetters["tasks/getActiveTasks"])
        commit("addTask", rootGetters["tasks/getActiveTasks"])
        axios.get("/api/v1/reports/" + currentProjectId).then(
            response => {
                commit("setWeek", response.data.data.length + 1)
            }
        )
        // if (state.currentWeekReport.week == null) {
        //     week = 1
        // }
        // else{
        //     week = state.currentWeekReport.week + 1
        // }
    // await axios.get("/api/v1/projects/" + currentProjectId).then(
    //     response => {
    //       console.log("inproject", response.data.data)
    //       commit("setProject", response.data.data)
    //     }
    //     )
    // await axios
    //     .get(
    //       "/api/v1/projects/" + currentProjectId +
    //       "/members"
    //     )
    //     .then(response => {
    //       console.log("allmember ",response.data.data)
    //         commit("setMember", response.data.data)
    //     });
    },

};

export const mutations = {
    addTask: (state, tasklist) => (state.currentWeekReport['task'] = tasklist),
    setWeek: (state, weekNum) => (state.currentWeekReport['weekNum'] = weekNum)
};
