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
  projects: [
    {
      _id: 1,
      title: "Tournament",
      admin: 1,
      finished: false,
      //   date: new Date("December 25, 1995"),
    },
    {
      _id: 2,
      title: "BITS",
      admin: 1,
      finished: true,
    },
    {
      _id: 3,
      title: "Algorithms",
      admin: 1,
      finished: false,
    },
    {
      _id: 4,
      title: "Machine Learning",
      admin: 2,
      finished: true,
    },
    {
      _id: 5,
      title: "User Centered design",
      admin: 2,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      _id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
  ],
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
    for (let i = 0; i < this.state.projects.length; i++){
      trelloIds.append(state.projects[i]["_id"])
    }
    return trelloIds
  }
};

export const actions = {
  fetchProjectByUser({ commit }) {
    axios.get("/api/v1/users/me/projects").then((response) => {
      // console.log(response.data);
      commit("setProjects", response.data.data);
    });
    // console.log(this.recent)
    // console.log(this.done)
    // axios.get('v1/users/me/projects')
    // .then(response => {
    //   console.log(response.data);
    //   for(let i = 0; i < response.data.data.length; i++){
    //     if(response.data.data[i].finished == false){
    //       this.ongoing.push(response.data.data[i])
    //     }
    //     else{
    //       this.done.push(response.data.data[i])
    //     }
    //   }
    // })
  },
};

export const mutations = {
  setProjects: (state, projects) => (state.projects = projects),
  newProjects: (state, project) => state.projects.unshift(project),
  finishProject: (state, id) =>
    (state.projects.filter((project) => project.id == id).finished = true),
};
