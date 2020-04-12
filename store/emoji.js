export const state = () => ({
  all: [],
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
  orderByDate(_, getters) {
    return getters.all.sort((a, b) => {
      return a.created - b.created;
    });
  },
  byAuthor(_, getters) {
    return groupBy(getters.orderByDate, (emoji) => emoji.user_display_name);
  },
  byDate(_, getters) {
    return groupBy(getters.all, (emoji) => {
      // MEMO: This is local time; for UTC, setUTCHours
      return new Date(emoji.created * 1000).setHours(0, 0, 0);
    });
  },
};

export const mutations = {
  setAll(state, obj) {
    state.all = obj;
  },
  clear(state) {
    state.all = [];
  },
};
