import createPersistedState from "vuex-persistedstate";
import EmojiService from "~/services/emojiService";

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
        new EmojiService(store).fetchAll();
      },
    })(store);
  });
};
