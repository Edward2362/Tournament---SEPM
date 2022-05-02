import axios from "axios";
import createPersistedState from 'vuex-persistedstate';

export const state = () => ({
  user: null,
});
function getPlugins() {
  let plugins = []

  if (process.browser) {
      plugins = createPersistedState({
        key: "user",
        storage: window.sessionStorage,
      })
  }
  return plugins;
};
export const plugins = getPlugins();

export const getters = {
  getUserId(state) {
    return state.id;
  },
  getUser(state) {
    return state;
  },
  getUserTrelloId(state) {
    return state.user.trelloId
  },
  getUserToken(state) {
    return state.user.trelloToken
  }
};
export const actions = {
  fetchUserByCookie({ commit }) {
    axios.get("api/v1/users/me").then((response) => {
      commit("setUser", response.data.data);
    });
  },
  changeTrelloId({ commit }, newTrelloId) {
    commit("settrelloId", newTrelloId);
  },
};

export const mutations = {
  setUser: (state, theUser) => (state = theUser),
  setTrelloId: (state, newTrelloId) => (state.trelloId = newTrelloId),
};
