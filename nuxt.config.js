export default {
  mode: "spa",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/reset.css"],
  plugins: [{ src: "~/plugins/localStorage.js", ssr: false }],
  buildModules: [],
  modules: ["@nuxtjs/axios"],
  axios: {},
  build: {
    extend(config, ctx) {}
  },
  router: {
    base: "/slack_emoji_viewer/"
  }
};
