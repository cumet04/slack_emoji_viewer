export const state = () => ({
  all: []
});

export const mutations = {
  push(state, obj) {
    state.all.push(obj);
  },
  pop(state, obj) {
    state.all.pop(obj);
  },
  clear(state) {
    state.all.splice(0, state.all.length);
  }
};
