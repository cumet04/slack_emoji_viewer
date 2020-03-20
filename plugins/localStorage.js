import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ["emoji.workspace", "emoji.token"]
    })(store);
  });
};
