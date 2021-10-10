import { reactive } from "vue";
import storage from "./storage";

type PreferenceState = {
  theme: Theme;
};

const key = "preference";
const save = (v: PreferenceState) => storage.save(key, v);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createPreferenceStore() {
  const { theme } = storage.get(key) as PreferenceState;
  const state: PreferenceState = reactive({
    theme: theme || "Light",
  });

  return {
    theme: () => state.theme,
    setTheme(t: Theme) {
      state.theme = t;
      save(state);
    },
  };
}
