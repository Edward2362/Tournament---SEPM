import axios from "axios";
import createPersistedState from 'vuex-persistedstate';

function getPlugins() {
  let plugins = []

  if (process.browser) {
    plugins = createPersistedState({
      key: "projects",
      storage: window.sessionStorage,
    })
  }
  return plugins;
};
export const plugins = getPlugins();


export const state = () => ({
  projects: [],
});

export const getters = {
  getRecentProject(state) {
    return state.projects.slice(0, 4).sort(function (a, b) {
      return a.updatedAt - b.lastAccessed;
    });
  },
  getOnGoingProject(state) {
    return state.projects.filter((project) => project.finished === false);
  },  
  getDoneProject(state) {
    return state.projects.filter((project) => project.finished === true);
  },
  getProjectId(state) {
    const trelloIds = [];
    for (let i = 0; i < state.projects.length; i++){
      trelloIds.push(state.projects[i]["trelloBoardId"])
    }
    console.log("projects", trelloIds)
    return trelloIds
  },
  getMemberWithProjectId(state, projectId) {
    return state.projects.find(project => project._id === projectId)
  }
};

export const actions = {
  fetchProjectByUser({ commit }) {
    axios.get("/api/v1/users/me/projects?limit=99").then((response) => {
      // console.log(response.data);
      commit("setProjects", response.data.data);
    });

  },
  async createNewProject({ commit, rootGetters }, { name, trelloId, rewardBoundary, penaltyBoundary, memberTrelloIds }) {
    var newProjectId = ""
    console.log("name", name, "trelloId", trelloId,)
    await axios
        .post("/api/v1/projects", {
          name: name,
          trelloBoardId: trelloId,
        })
        .then((response) => {
          newProjectId = response.data.data["_id"];
        });
      await axios.patch("/api/v1/projects/" + newProjectId, {
        upperBoundary: rewardBoundary,
        lowerBoundary: penaltyBoundary,
      }).then((response) => {
        window.location.replace("/projects/" + newProjectId);
        commit("newProject", response.data)
      })
    var allMemberTrelloId = []
    await axios.get("/api/v1/users").then(response => {
      for(member in response.data.data)
      allMemberTrelloId.push(member.trelloId)
    })
    var memberIds = []
    for (memberTrelloId in memberTrelloIds) {
      if (rootGetters["user/getUser"].trelloId.includes(memberTrelloId.id)) {
        memberIds.push(rootGetters["user/getUser"]._id)
      }
      else if (allMemberTrelloId.includes(memberTrelloId.id)) {
        memberIds.push(memberTrelloId.id)
      }
    }
    const promises = []
    for (memberId in memberIds) {
      promises.push( axios.post("/api/v1/projects" + newProjectId + "/members", {
        userId: memberId
      }))
    }
    await Promise.all(promises)
  }
};

export const mutations = {
  setProjects: (state, projects) => (state.projects = projects),
  newProject: (state, project) => state.projects.unshift(project),
  finishProject: (state, id) =>
    (state.projects.filter((project) => project.id == id).finished = true),
};
