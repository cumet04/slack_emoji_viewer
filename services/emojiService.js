import axios from "axios";

async function getAllEmojis(workspace, maxCount) {
  const resp = await axios.post(
    `https://${workspace.domain}.slack.com/api/emoji.adminList`,
    [`token=${workspace.token}`, `count=${maxCount}`].join("&")
  );
  if (!resp.data.ok) {
    console.error(`fetch emoji failed: ${JSON.stringify(resp.data)}`);
    return null;
  }
  return resp.data.emoji;
}

function mapApiDataToModel(data) {
  const imgBase = "https://ca.slack-edge.com";
  const imgSize = 48;
  const userImage = `${imgBase}/${data.team_id}-${data.user_id}-${data.avatar_hash}-${imgSize}`;
  return {
    userImage,
    userName: data.user_display_name,
    created: data.created,
    aliases: data.is_alias == 0 ? [] : null,
    name: data.name,
    image: data.url,
  };
}

class EmojiService {
  constructor(store) {
    this._store = store;
    this.maxCount = 2000;
  }

  async fetchAll() {
    const workspace = this._store.getters["workspace/current"];
    if (!workspace) return;
    const raw = await getAllEmojis(workspace, this.maxCount);
    if (!raw) return;

    const aliases = raw
      .filter((data) => data.is_alias == 1)
      .reduce((map, data) => {
        const key = data.alias_for;
        (map[key] || (map[key] = [])).push(mapApiDataToModel(data));
        return map;
      });

    const emojis = raw
      .filter((data) => data.is_alias == 0)
      .map((data) => {
        const mapped = mapApiDataToModel(data);
        if (aliases[mapped.name]) mapped.aliases = aliases[mapped.name];
        return mapped;
      });

    this._store.commit("emoji/setAll", emojis);
  }
}

export default EmojiService;
