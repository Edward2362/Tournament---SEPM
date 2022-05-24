import axios from "axios";
import createPersistedState from "vuex-persistedstate";

function getPlugins() {
  let plugins = [];

  if (process.browser) {
    plugins = createPersistedState({
      key: "project",
      storage: window.sessionStorage,
    });
  }
  return plugins;
}
export const plugins = getPlugins();

export const state = () => ({
  project: {},
});

export const getters = {
  getCurrentProject(state) {
    return state.project;
  },
  getMembers(state) {
    if (state.project.members != null) {
      return state.project.members;
    }
    return state.project;
  },
};

export const actions = {
  async fetchCurrentProject({ commit }, currentProjectId) {
    await axios.get("/api/v1/projects/" + currentProjectId).then((response) => {
      console.log("inproject", response.data.data);
      commit("setProject", response.data.data);
    });
    await axios
      .get(
        "/api/v1/projects/" + currentProjectId + "/members?sort=-overallPoint"
      )
      .then((response) => {
        console.log("allmember ", response.data.data);
        commit("setMember", response.data.data);
      });
  },
};

export const mutations = {
  setProject: (state, project) => (state.project = project),
  setMember: (state, memberIds) => {
    state.project["members"] = memberIds;
  },
};
