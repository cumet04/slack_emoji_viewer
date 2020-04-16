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

class EmojiService {
  constructor(store) {
    this._store = store;
    this.maxCount = 2000;
  }

  async fetchAll() {
    const workspace = this._store.getters["workspace/current"];
    if (!workspace) return;
    raw = getAllEmojis(workspace, this.maxCount);
    if (!raw) return;

    emojis = raw;
    this._store.commit("emoji/setAll", emojis);
  }
}

export default EmojiService;
