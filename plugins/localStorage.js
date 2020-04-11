import createPersistedState from "vuex-persistedstate";
import EmojiService from "~/services/emojiService";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ["workspace"],
      rehydrated: (store) => {
        new EmojiService(store).fetchAll();
      },
    })(store);
  });
};
