import { reactive } from "vue";
import storage from "./storage";

type WorkspaceState = {
  all: { [k: string]: Workspace };
  current: string; // domain string
};

const key = "workspace";
const save = (v: WorkspaceState) => storage.save(key, v);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createWorkspaceStore() {
  const { all, current } = storage.get(key) as WorkspaceState;
  const state: WorkspaceState = reactive({
    all: all || {},
    current: current || "",
  });
  return {
    all: () => Object.values(state.all),
    current: (): Workspace | undefined => state.all[state.current],
    setCurrent(domain: string) {
      state.current = domain;
      save(state);
      return this.current();
    },
    add(w: Workspace) {
      state.all[w.domain] = w;
      save(state);
      return w;
    },
    remove(domain: string) {
      delete state.all[domain];
    },
    clear: () => {
      state.all = {};
      state.current = "";
      save(state);
    },
  };
}
