import { createEmojiStore } from "./store/emojis";
import { createWorkspaceStore } from "./store/workspaces";
import { App, InjectionKey } from "vue";

export type Store = ReturnType<typeof createStore>;
export const storeKey = Symbol() as InjectionKey<Store>;

export function createStore() {
  const store = {
    emoji: createEmojiStore(),
    workspace: createWorkspaceStore(),
    install(app: App) {
      app.provide(storeKey, store);
      app.config.globalProperties.$store = store;
    },
  };
  return store;
}
