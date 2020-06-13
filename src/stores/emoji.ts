import { reactive } from "vue";

type EmojiState = {
  all: Emoji[];
};

const groupBy = (source: Emoji[], getkey: (a: Emoji) => string) =>
  source.reduce((map, item) => {
    const key = getkey(item);
    (map[key] || (map[key] = [])).push(item);
    return map;
  }, {} as { [k: string]: Emoji[] });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createEmojiStore() {
  const state: EmojiState = reactive({
    all: [],
  });
  const allClone = () => Object.assign([], state.all) as Emoji[];
  return {
    setAll(emojis: Emoji[]) {
      state.all = emojis;
    },
    orderByName() {
      return allClone().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    orderByDate() {
      return allClone().sort((a, b) => {
        return a.created > b.created ? 1 : -1;
      });
    },
    byAuthor() {
      return groupBy(this.orderByDate(), (emoji) => emoji.userName);
    },
    byDate() {
      return groupBy(allClone(), (emoji) => {
        // MEMO: This is local time; for UTC, setUTCHours
        return emoji.created.setHours(0, 0, 0).toString();
      });
    },
  };
}
