import { createEmojiStore } from "./stores/emoji";
import { createStockStore } from "./stores/stock";
import { createWorkspaceStore } from "./stores/workspace";
import { createPreferenceStore } from "./stores/preference";
import { App, InjectionKey, inject } from "vue";

export type Store = {
  emoji: ReturnType<typeof createEmojiStore>;
  stock: ReturnType<typeof createStockStore>;
  workspace: ReturnType<typeof createWorkspaceStore>;
  preference: ReturnType<typeof createPreferenceStore>;
  install(app: App): void;
};
const storeKey = Symbol() as InjectionKey<Store>;

export function createStore(): Store {
  const store = {
    emoji: createEmojiStore(),
    stock: createStockStore(),
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
