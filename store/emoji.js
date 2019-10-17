export const state = () => ({
  all: {},
  stock: []
})

export const mutations = {
  set_all(state, obj) {
    state.all = obj
  },
  push_stock(state, obj) {
    state.stock.push(obj)
  },
  pop_stock(state, obj) {
    state.stock.pop(obj)
  },
  clear_stock(state) {
    state.stock.splice(0, state.stock.length)
  }
}
