import { reactive } from "vue";

type WorkspaceState = {
  all: { [k: string]: Workspace };
  current: string; // domain string
};

const storageKey = "vuex-slack_emoji_viewer";
function loadFromStorage() {
  const rawStr = localStorage.getItem(storageKey);
  if (!rawStr) return { all: null, current: null };
  const raw = JSON.parse(rawStr).workspace;

  // migration code
  if (raw._all) {
    raw.all = raw._all;
    delete raw._all;
  }
  if (raw._current) {
    raw.current = raw._current;
    delete raw._current;
  }

  return raw;
}

function saveToStorage(value: WorkspaceState) {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      workspace: value,
    })
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createWorkspaceStore() {
  const { all, current } = loadFromStorage();
  const state: WorkspaceState = reactive({
    all: all || {},
    current: current || "",
  });
  return {
    all: () => Object.values(state.all),
    current: (): Workspace | undefined => state.all[state.current],
    setCurrent(domain: string) {
      state.current = domain;
      saveToStorage(state);
      return this.current();
    },
    add(w: Workspace) {
      state.all[w.domain] = w;
      saveToStorage(state);
      return w;
    },
    clear: () => {
      state.all = {};
      state.current = "";
    },
  };
}
