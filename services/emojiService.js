import axios from "axios";

class EmojiService {
  constructor(store) {
    this._store = store;
    this.maxCount = 2000;
  }

  async fetchAll() {
    const workspace = this._store.getters["workspace/current"];
    if (!workspace) return;

    const resp = await axios.post(
      `https://${workspace.domain}.slack.com/api/emoji.adminList`,
      [`token=${workspace.token}`, `count=${this.maxCount}`].join("&")
    );

    if (resp.data.ok) {
      this._store.commit("emoji/setAll", resp.data.emoji);
    } else {
      console.error(`fetch emoji failed: ${JSON.stringify(resp.data)}`);
    }
  }
}

export default EmojiService;
