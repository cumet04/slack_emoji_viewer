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
    forAll(queries: string[]) {
      // @-prefixed: search by user name
      // :-prefixed: search by emoji name
      let emojis = allClone();

      emojis = emojis.filter((emoji) => {
        let ok = true;
        for (const q of queries) {
          if (q.startsWith("@")) {
            const u = q.substring(1).toLowerCase();
            if (!emoji.userName.toLowerCase().includes(u)) ok = false;
          } else if (q.startsWith(":")) {
            const u = q.substring(1).toLowerCase();
            const names = [emoji.name, ...emoji.aliases?.map((e) => e.name)];
            if (names.every((n) => !n.toLowerCase().includes(u))) ok = false;
          }
        }
        return ok;
      });

      emojis = emojis.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      return emojis;
    },
    forDaily() {
      return groupBy(this.forAll([]), (emoji) => {
        // MEMO: This is local time; for UTC, setUTCHours
        return emoji.created.setHours(0, 0, 0).toString();
      });
    },
    forUser(queries: string[]) {
      const emojis = this.forAll(queries).sort((a, b) => {
        return a.created > b.created ? 1 : -1;
      });
      return groupBy(emojis, (emoji) => emoji.userName);
    },
  };
}
