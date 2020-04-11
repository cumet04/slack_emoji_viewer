export const state = () => ({
  all: [],
});

export const getters = {
  all(state) {
    return [].concat(state.all);
  },
  latest_sorted(state, getters) {
    return getters.all.sort((a, b) => {
      return a.created - b.created;
    });
  },
};

export const mutations = {
  setAll(state, obj) {
    state.all = obj;
  },
  clear(state) {
    state.all = [];
  },
};
