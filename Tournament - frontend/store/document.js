export const state = () => ({
  create: false,
  chooseTask: false,
  coverTask: false,
});

export const getters = {
  isOverlayCreate(state) {
    return state.create;
  },
  isOverlayChooseTask(state) {
    return state.chooseTask;
  },
  isOverlayCoverTask(state) {
    return state.coverTask;
  },
};

export const actions = {};

export const mutations = {
  setOverlayCreate(state) {
    state.create = !state.create;
    if (state.create) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  },
  setOverlayChooseTask(state) {
    state.chooseTask = !state.chooseTask;
    if (state.chooseTask) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  },
  setOverlayCoverTask(state) {
    state.coverTask = !state.coverTask;
    if (state.coverTask) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  },
};
