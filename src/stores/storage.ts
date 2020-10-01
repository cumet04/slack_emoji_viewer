const storageKey = "slack_emoji_viewer_storage";
const storage = {
  data: (() => {
    const rawStr = localStorage.getItem(storageKey);
    return rawStr ? JSON.parse(rawStr) : {};
  })(),
  get: function (key: string): Record<string, unknown> {
    return this.data[key] || {};
  },
  save: function (key: string, value: Record<string, unknown>): void {
    this.data[key] = value;
    localStorage.setItem(storageKey, JSON.stringify(this.data));
  },
};

export default storage;
