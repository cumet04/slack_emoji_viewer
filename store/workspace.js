import Vue from "vue";
import EmojiService from "~/services/emojiService";

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
    new EmojiService($nuxt.$store).fetchAll();
  },
  set(state, { name, domain, icon, token }) {
    Vue.set(state._all, domain, { name, domain, icon, token });
    state._current = domain;
    new EmojiService($nuxt.$store).fetchAll();
  },
  delete(state, domain) {
    delete state._all[domain];
  },
  clear(state) {
    state._all = {};
  },
};
