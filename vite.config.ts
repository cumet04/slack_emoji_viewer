import { UserConfig } from "vite";

const url = process.env["GITHUB_SERVER_URL"]
  ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}`
  : "https://example.com";

const config: UserConfig = {
  base: "/slack_emoji_viewer",
  env: {
    REPOSITORY_URL: url,
    BUILD_TIME: Date.now().toString(),
    GITHUB_SHA: process.env["GITHUB_SHA"] || "xxxxxxx",
  },
};

export default config;
