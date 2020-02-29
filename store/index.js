export const actions = {
  nuxtServerInit({ commit }, { req }) {
    commit("emoji/set_token", process.env.SLACK_TOKEN);
  }
};
