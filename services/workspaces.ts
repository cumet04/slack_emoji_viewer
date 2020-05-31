import Emojis from "~/services/emojis";
import StoreHelper from "~/services/storeHelper";

const { getter, commit } = StoreHelper("workspace");

export type Workspace = {
  name: string;
  domain: string;
  icon: string;
  token: string;
};

export default {
  all: () => getter("all") as Workspace[],
  current: () => getter("current") as Workspace,
  setCurrent(domain: string) {
    commit("setCurrent", domain);
    Emojis.fetchAll();
    return this.current();
  },
  add(w: Workspace) {
    commit("add", w);
    return w;
  },
};
