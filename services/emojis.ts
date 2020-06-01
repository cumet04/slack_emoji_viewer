import axios from "axios";
import Workspaces from "~/services/workspaces";
import { Workspace } from "~/services/workspaces";
import StoreHelper from "~/services/storeHelper";

const { getter, commit } = StoreHelper("emoji");

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

    commit("setAll", emojis);
  },
  all: () => getter("all") as Emoji[],
  orderByName: () => getter("orderByName") as Emoji[],
  orderByDate: () => getter("orderByDate") as Emoji[],
  byAuthor: () => getter("byAuthor") as { [author: string]: Emoji[] },
  byDate: () => getter("byDate") as { [author: number]: Emoji[] },

  allStock: () => getter("allStock") as Emoji[],
  pushStock: (emoji: Emoji) => commit("pushStock", emoji),
  popStock: (emoji: Emoji) => commit("popStock", emoji),
  clearStock: () => commit("clearStock"),
};
