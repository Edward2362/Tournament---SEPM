import axios from "axios";

export const state = () => ({
  user: null,
});

export const getters = {
  getUserId(state) {
    return state.id;
  },
  getUser(state) {
    console.log(state);
    return state;
  },
  getUserTrelloId(state) {
    return state.trelloId;
  },
  getUserToken(state) {
    return state.trelloToken;
  },
};
export const actions = {
  fetchUserByCookie({ commit }) {
    axios.get("api/v1/users/me").then((response) => {
      console.log(response.data);
      console.log("đã run1");
      commit("setUser", response.data.data);
    });
  },
  changeTrelloId({ commit }, newtrelloId) {
    commit("settrelloId", newtrelloId);
  },
};

export const mutations = {
  setUser: (state, theUser) => (state = theUser),
  settrelloId: (state, newtrelloId) => (state.trelloId = newtrelloId),
};
