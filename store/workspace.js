import Vue from "vue";

export const state = () => ({
  _all: {},
  _current: null,
});

export const getters = {
  all(state) {
    return Object.values(state._all);
  },
  current(state) {
    return state._all[state._current];
  },
};

export const mutations = {
  setCurrent(state, domain) {
    state._current = domain;
  },
  add(state, { name, domain, icon, token }) {
    Vue.set(state._all, domain, { name, domain, icon, token });
  },
};
