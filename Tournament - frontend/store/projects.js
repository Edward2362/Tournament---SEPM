export const state = () => ({
  projects: [
    {
      id: 1,
      title: "Tournament",
      admin: 1,
      finished: false,
      //   date: new Date("December 25, 1995"),
    },
    {
      id: 2,
      title: "BITS",
      admin: 1,
      finished: true,
    },
    {
      id: 3,
      title: "Algorithms",
      admin: 1,
      finished: false,
    },
    {
      id: 4,
      title: "Machine Learning",
      admin: 2,
      finished: true,
    },
    {
      id: 5,
      title: "User Centered design",
      admin: 2,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
    {
      id: 6,
      title: "Machine Learning 2",
      admin: 3,
      finished: false,
    },
  ],
});

export const getters = {
  getRecentProject(state, user) {},
  getOnGoingProject(state) {
    return state.projects.filter((project) => project.finished === false);
  },
  getDoneProject(state) {
    return state.projects.filter((project) => project.finished === true);
  },
};

export const actions = {
  fetchProjectByUser({ commit }, userId) {},
};

export const mutations = {};
