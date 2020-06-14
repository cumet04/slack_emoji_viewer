import { reactive } from "vue";

type StockState = {
  all: Emoji[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createStockStore() {
  const state: StockState = reactive({
    all: [],
  });
  return {
    all() {
      return state.all;
    },
    push: (emoji: Emoji) => state.all.push(emoji),
    clear: () => state.all.splice(0, state.all.length),
  };
}
