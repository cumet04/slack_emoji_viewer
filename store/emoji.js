const axios = require("axios");

export const state = () => ({
  workspace: null,
  token: null,
  all: []
});

export const getters = {
  all(state) {
    return [].concat(state.all);
  },
  latest_sorted(state, getters) {
    return getters.all.sort((a, b) => {
      return a.created - b.created;
    });
  }
};

export const mutations = {
  set_all(state, obj) {
    state.all = obj;
  },
  set_workspace(state, obj) {
    state.workspace = obj;
  },
  set_token(state, obj) {
    state.token = obj;
  }
};

export const actions = {
  fetch_all({ state, commit }, workspace) {
    if (state.all.length > 0) return;

    const max_count = 2000;
    axios
      .post(
        `https://${workspace.domain}.slack.com/api/emoji.adminList`,
        [`token=${workspace.token}`, `count=${max_count}`].join("&")
      )
      .then(resp => {
        if (resp.data.ok) {
          commit("set_all", resp.data.emoji);
        } else {
          console.error(`fetch emoji failed: ${JSON.stringify(resp.data)}`);
        }
      });
  }
};
