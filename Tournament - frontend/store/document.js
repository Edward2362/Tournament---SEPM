export const state = () => ({
  overlay: false,
});

export const getters = {
  isOverlay(state) {
    return state.overlay;
  },
};

export const actions = {};

export const mutations = {
  setOverlay(state) {
    state.overlay = !state.overlay;
    if (state.overlay) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  },
};
