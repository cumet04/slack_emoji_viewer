import { createEmojiStore } from "./store/emojis";
import { createWorkspaceStore } from "./store/workspaces";
import { App, InjectionKey, inject } from "vue";

export type Store = ReturnType<typeof createStore>;
const storeKey = Symbol() as InjectionKey<Store>;

export function createStore() {
  const store = {
    emoji: createEmojiStore(),
    workspace: createWorkspaceStore(),
    install(app: App) {
      app.provide(storeKey, store);
    },
  };
  return store;
}

export function fetchStore() {
  const s = inject(storeKey);
  if (s === undefined) throw "fetchStore failed";
  return s;
}
