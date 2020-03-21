export const state = () => ({
  all: {},
  _current: null
});

export const getters = {
  current(state) {
    return state.all[state._current];
  }
};

export const mutations = {
  setCurrent(state, name) {
    state._current = name;
  },
  set(state, { name, domain, icon, token }) {
    state.all[name] = { name, domain, icon, token };
    state._current = name;
  },
  delete(state, name) {
    delete state.all[name];
  },
  clear(state) {
    for (let name in state.all) delete state.all[name];
  }
};
