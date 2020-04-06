export const state = () => ({
  all: {},
  _current: null,
});

export const getters = {
  current(state) {
    return state.all[state._current];
  },
};

export const mutations = {
  setCurrent(state, domain) {
    state._current = domain;
  },
  set(state, { name, domain, icon, token }) {
    state.all[domain] = { name, domain, icon, token };
    state.all = Object.assign({}, state.all); // fire watcher
    state._current = domain;
  },
  delete(state, domain) {
    delete state.all[domain];
  },
  clear(state) {
    for (let domain in state.all) delete state.all[domain];
  },
};
