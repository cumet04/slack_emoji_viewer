import { reactive } from "vue";

export type Domain = string;
export type Workspace = {
  name: string;
  domain: Domain;
  icon: string;
  token: string;
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

function saveToStorage(value: any) {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      workspace: value,
    })
  );
}

let _state: any;
const state = () => {
  if (!_state) {
    const { all, current } = loadFromStorage();
    _state = reactive({
      all: (all || {}) as { [k: string]: Workspace }, // [k: Domain]
      current: (current || "") as Domain,
    });
  }
  return _state;
};

export default {
  all: () => Object.values(state().all) as Workspace[],
  current: () => state().all[state().current] as Workspace,
  setCurrent(domain: Domain) {
    state().current = domain;
    saveToStorage(state());
    return this.current();
  },
  add(w: Workspace) {
    state().all[w.domain] = w;
    saveToStorage(state());
    return w;
  },
};
