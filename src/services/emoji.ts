import axios from "axios";
import { Store } from "../store";

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

async function getAllEmojis(domain: string, token: string, maxCount: number) {
  const resp = await axios.post(
    `https://${domain}.slack.com/api/emoji.adminList`,
    [`token=${token}`, `count=${maxCount}`].join("&")
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

async function fetchAll(
  domain: string,
  token: string
): Promise<Emoji[] | undefined> {
  const maxCount = 2000;
  const raw = await getAllEmojis(domain, token, maxCount);
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

  return emojis;
}

export async function reloadEmojis(store: Store): Promise<void> {
  const w = store.workspace.current();
  if (!w) return;
  const emojis = await fetchAll(w.domain, w.token);
  if (!emojis) return;
  store.emoji.setAll(emojis);
}
