import createPersistedState from "vuex-persistedstate";
import Emojis from "~/services/emojis";

export default ({ store }) => {
  window.onNuxtReady(() => {
    // TODO: This is migration code. Remove later
    if (
      localStorage.getItem("vuex") &&
      !localStorage.getItem("vuex-slack_emoji_viewer")
    ) {
      localStorage.setItem(
        "vuex-slack_emoji_viewer",
        localStorage.getItem("vuex")
      );
      localStorage.removeItem("vuex");
    }

    createPersistedState({
      key: "vuex-slack_emoji_viewer",
      paths: ["workspace"],
      rehydrated: (store) => {
        Emojis.fetchAll();
      },
    })(store);
  });
};
