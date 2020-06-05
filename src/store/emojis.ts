import { reactive } from "vue";
import axios from "axios";
import Workspaces from "../store/workspaces";
import { Workspace } from "../store/workspaces";

// FIXME: type
// Call 'reactive' at first use, to load composition-api plugin in advance
let _state: any;
const state = () => {
  if (!_state) {
    _state = reactive({
      all: [] as Emoji[],
      stock: [] as Emoji[],
    });
  }
  return _state;
};
const allClone = () => Object.assign([], state().all) as Emoji[];

// emoji.adminList response's type
type SlackEmoji = {
  name: string;
  user_display_name: string;
  team_id: string;
  user_id: string;
  avatar_hash: string;
  created: string;
  is_alias: 0 | 1;
  alias_for: string;
  url: string;
};

export type Emoji = {
  userImage: string;
  userName: string;
  created: Date;
  aliases: Emoji[];
  isAlias: boolean;
  name: string;
  image: string;
};

async function getAllEmojis(workspace: Workspace, maxCount: number) {
  const resp = await axios.post(
    `https://${workspace.domain}.slack.com/api/emoji.adminList`,
    [`token=${workspace.token}`, `count=${maxCount}`].join("&")
  );
  if (!resp.data.ok) {
    console.error(`fetch emoji failed: ${JSON.stringify(resp.data)}`);
    return null;
  }
  return resp.data.emoji as SlackEmoji[];
}

function mapApiDataToModel(data: SlackEmoji): Emoji {
  const imgBase = "https://ca.slack-edge.com";
  const imgSize = 48;
  const userImage = `${imgBase}/${data.team_id}-${data.user_id}-${data.avatar_hash}-${imgSize}`;
  return {
    userImage,
    userName: data.user_display_name,
    created: new Date(parseInt(data.created) * 1000),
    aliases: [],
    isAlias: data.is_alias == 1,
    name: data.name,
    image: data.url,
  };
}

const groupBy = (source: Emoji[], getkey: (a: Emoji) => string) =>
  source.reduce((map, item) => {
    const key = getkey(item);
    (map[key] || (map[key] = [])).push(item);
    return map;
  }, {} as { [k: string]: Emoji[] });

export default {
  async fetchAll() {
    const workspace = Workspaces.current();
    if (!workspace) return;

    const maxCount = 2000;
    const raw = await getAllEmojis(workspace, maxCount);
    if (!raw) return;

    const aliases = raw
      .filter((data) => data.is_alias == 1)
      .reduce((map, data) => {
        const key = data.alias_for;
        (map[key] || (map[key] = [])).push(mapApiDataToModel(data));
        return map;
      }, {} as { [key: string]: Emoji[] });

    const emojis = raw
      .filter((data) => data.is_alias == 0)
      .map((data) => {
        const mapped = mapApiDataToModel(data);
        if (aliases[mapped.name]) mapped.aliases = aliases[mapped.name];
        return mapped;
      });

    state().all.splice(0, state().all.length, ...emojis);
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
  allStock() {
    return state().stock;
  },
  pushStock: (emoji: Emoji) => state().stock.push(emoji),
  clearStock: () => state().stock.splice(0, state().stock.length),
};
