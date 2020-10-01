import { createEmojiStore } from "./stores/emoji";
import { createWorkspaceStore } from "./stores/workspace";
import { createPreferenceStore } from "./stores/preference";
import { App, InjectionKey, inject } from "vue";

export type Store = {
  emoji: ReturnType<typeof createEmojiStore>;
  workspace: ReturnType<typeof createWorkspaceStore>;
  preference: ReturnType<typeof createPreferenceStore>;
  install(app: App): void;
};
const storeKey = Symbol() as InjectionKey<Store>;

export function createStore(): Store {
  const store = {
    emoji: createEmojiStore(),
    workspace: createWorkspaceStore(),
    preference: createPreferenceStore(),
    install(app: App) {
      app.provide(storeKey, store);
    },
  };
  return store;
}

export function useStore(): Store {
  const s = inject(storeKey);
  if (s === undefined) throw "useStore failed";
  return s;
}
