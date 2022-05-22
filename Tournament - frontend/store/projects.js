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
      commit("newProject", response.data)
    })
    var allUsers = []
    await axios.get("/api/v1/users?limit=9999").then(response => {
      allUsers = response.data.data
    }
    )
    var memberIds = []
    console.log("membertrelloId : ", memberTrelloIds)
    
    var trueMemberTrelloIds = memberTrelloIds.map(m=>m.id)
    // console.log("allmemTrelloId: ", allMemberTrelloIds)
    for (let i = 0; i < allUsers.length; i++) {
      console.log("memberTrelloId:", allUsers[i])
      // if (rootGetters["user/getUser"].trelloId.includes(memberTrelloIds[i].id)) {
      //   memberIds.push(rootGetters["user/getUser"]._id)
      // }

      if (trueMemberTrelloIds.includes(allUsers[i].trelloId)) {
        memberIds.push(allUsers[i]._id)
      }
    }
    const promises = []
    console.log("memID: ", memberIds)
    console.log("heyyy", rootGetters["user/getUserId"])
    for (let memId of memberIds) {
      if (memId != rootGetters["user/getUserId"]) {
        promises.push(axios.post("/api/v1/projects/" + newProjectId + "/members", {
          userId: memId
        }))
      }
    }
    await Promise.all(promises)
    window.location.replace("/projects/"+ newProjectId)
  }
};

export const mutations = {
  setProjects: (state, projects) => (state.projects = projects),
  newProject: (state, project) => state.projects.unshift(project),
  finishProject: (state, id) =>
    (state.projects.filter((project) => project.id == id).finished = true),
};
