const store = () => window.$nuxt.$store;

export default function (ns: string) {
  return {
    getter: (name: string) => store().getters[`${ns}/${name}`],
    commit: (name: string, payload?: any) =>
      store().commit(`${ns}/${name}`, payload),
  };
}
