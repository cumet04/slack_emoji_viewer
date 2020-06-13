import { createEmojiStore } from "./stores/emoji";
import { createWorkspaceStore } from "./stores/workspace";
import { App, InjectionKey, inject } from "vue";

export type Store = {
  emoji: ReturnType<typeof createEmojiStore>;
  workspace: ReturnType<typeof createWorkspaceStore>;
  install(app: App): void;
};
const storeKey = Symbol() as InjectionKey<Store>;

export function createStore(): Store {
  const store = {
    emoji: createEmojiStore(),
    workspace: createWorkspaceStore(),
    install(app: App) {
      app.provide(storeKey, store);
    },
  };
  return store;
}

export function fetchStore(): Store {
  const s = inject(storeKey);
  if (s === undefined) throw "fetchStore failed";
  return s;
}
