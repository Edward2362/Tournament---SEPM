import axios from "axios";
import createPersistedState from "vuex-persistedstate";

export const state = () => ({
  user: null,
});
function getPlugins() {
  let plugins = [];

  if (process.browser) {
    plugins = createPersistedState({
      key: "user",
      storage: window.sessionStorage,
    });
  }
  return plugins;
}
export const plugins = getPlugins();

export const getters = {
  getUserId(state) {
    if (!state.user) return state.user;
    return state.user.userId;
  },
  getUser(state) {
    return state;
  },
  getUserTrelloId(state) {
    return state.user.trelloId;
  },
  getUserToken(state) {
    return state.user.trelloToken;
  },
  getUsername(state) {
    return state.user.username;
  },
  getAvatarUrl(state) {
    if (!state.user) return state.user;
    return state.user.avatarUrl;
  },
};
export const actions = {
  fetchUserByCookie({ commit }) {
    axios.get("/api/v1/users/me").then((response) => {
      console.log("response ne", response.data.data);
      commit("setUser", response.data.data);
    });
  },
};

export const mutations = {
  setUser: (state, theUser) => (state.user = theUser),
};
