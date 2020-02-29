export const state = () => ({
  stock: []
});

export const mutations = {
  push(state, obj) {
    state.stock.push(obj);
  },
  pop(state, obj) {
    state.stock.pop(obj);
  },
  clear(state) {
    state.stock.splice(0, state.stock.length);
  }
};
