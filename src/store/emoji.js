export const state = () => ({
  all: [],
  stock: [],
});

const groupBy = (source, getkey) =>
  source.reduce((map, item) => {
    const key = getkey(item);
    (map[key] || (map[key] = [])).push(item);
    return map;
  }, {});

export const getters = {
  all(state) {
    return [].concat(state.all);
  },
  orderByName(_, getters) {
    return getters.all.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  },
  orderByDate(_, getters) {
    return getters.all.sort((a, b) => {
      return a.created - b.created;
    });
  },
  byAuthor(_, getters) {
    return groupBy(getters.orderByDate, (emoji) => emoji.userName);
  },
  byDate(_, getters) {
    return groupBy(getters.all, (emoji) => {
      // MEMO: This is local time; for UTC, setUTCHours
      return emoji.created.setHours(0, 0, 0);
    });
  },
  allStock(state) {
    return state.stock;
  },
};

export const mutations = {
  setAll(state, obj) {
    state.all = obj;
  },
  pushStock(state, obj) {
    state.stock.push(obj);
  },
  popStock(state, obj) {
    state.stock.pop(obj);
  },
  clearStock(state) {
    state.stock.splice(0, state.stock.length);
  },
};