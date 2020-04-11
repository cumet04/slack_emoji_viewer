import Vue from "vue";
import EmojiService from "~/services/emojiService";

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
    new EmojiService($nuxt.$store).fetchAll();
  },
  set(state, { name, domain, icon, token }) {
    Vue.set(state.all, domain, { name, domain, icon, token });
    state._current = domain;
    new EmojiService($nuxt.$store).fetchAll();
  },
  delete(state, domain) {
    delete state.all[domain];
  },
  clear(state) {
    state.all = {};
  },
};
