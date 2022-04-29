import axios from "axios";

export const state = () => ({
  id: 1,
  name: "Quang",
  trelloId: null,
  lastAccess: [
    {
      id: 2,
      title: "BITS",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 3,
      title: "Algorithms",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 4,
      title: "Machine Learning",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 5,
      title: "User Centered design",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 6,
      title: "Machine Learning",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
  ],
});

export const getters = {
  getUserId(state) {
    return state.id;
  },
  getUser(state) {
    console.log(state)
    return state;
  },
  getUserTrelloId(state) {
    return state.trelloId
  },
  getUserToken(state) {
    return state.trelloToken
  }
};
export const actions = {
  fetchUserByCookie({ commit }) {
    axios.get("api/v1/users/me").then((response) => {
      console.log(response.data);
      console.log("đã run1")
      commit("setUser", response.data.data);
    });
  },
  changeTrelloId({ commit }, newtrelloId) {
    commit("settrelloId", newtrelloId)
  }
};

export const mutations = {
  setUser: (state, theUser) => (state = theUser),
  settrelloId: (state, newtrelloId) => (state.trelloId = newtrelloId)

};