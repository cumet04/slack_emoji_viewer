import replace from "@rollup/plugin-replace";
import { UserConfig } from "vite";

const url = process.env["GITHUB_SERVER_URL"]
  ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}`
  : "https://example.com";

const config: UserConfig = {
  base: "/slack_emoji_viewer",
  rollupInputOptions: {
    plugins: [
      replace({
        __repository_url__: url,
        __github_sha__: process.env["GITHUB_SHA"] || "xxxxxxx",
        __build_time__: Date.now().toString(),
      }),
    ],
  },
};

export default config;
