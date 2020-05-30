import EmojiService from "~/services/emojiService";

const store = () => window.$nuxt.$store;
const getter = (name: string) => store().getters[`workspace/${name}`];
const commit = (name: string, payload: any) =>
  store().commit(`workspace/${name}`, payload);

type Workspace = {
  name: string;
  domain: string;
  icon: string;
  toke: string;
};

export default {
  all: () => getter("all") as Workspace[],
  current: () => getter("current") as Workspace,
  setCurrent(domain: string) {
    commit("setCurrent", domain);
    new EmojiService(store()).fetchAll();
    return this.current();
  },
  add(w: Workspace) {
    commit("add", w);
    return w;
  },
};
