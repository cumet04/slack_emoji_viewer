export default {
  mode: "spa",
  srcDir: "src",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: { color: "#fff" },
  css: ["ress", "~/assets/css/base.css"],
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~/plugins/composition-api.ts" },
  ],
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/axios"],
  axios: {},
  build: {
    postcss: {
      plugins: {
        "postcss-nesting": {},
      },
    },
  },
  router: {
    base: "/slack_emoji_viewer/", // for gh-pages
  },
};
