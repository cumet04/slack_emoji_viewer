import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";

const url = process.env["GITHUB_SERVER_URL"]
  ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}`
  : "https://example.com";

export default defineConfig({
  build: {
    outDir: "../dist",
  },
  plugins: [
    vue(),
    replace({
      preventAssignment: true,
      values: {
        __repository_url__: url,
        __github_sha__: process.env["GITHUB_SHA"] || "xxxxxxx",
        __build_time__: Date.now().toString(),
      },
    }),
  ],
});
