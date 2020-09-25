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
    display() {
      // same as all(), but current ws is located at first
      let list = this.all();
      const pos = list.findIndex((v) => v == state.all[state.current]);
      if (pos != -1) list = list.splice(pos, 1).concat(list);
      return list;
    },
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
      if (domain == state.current && this.all().length > 0) {
        this.setCurrent(this.all()[0].domain);
      }
      save(state);
    },
    clear: () => {
      state.all = {};
      state.current = "";
      save(state);
    },
  };
}
