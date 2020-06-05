import { createRouter, createWebHistory } from "vue-router";
import Index from "./pages/index.vue";
import Author from "./pages/author.vue";
import Daily from "./pages/daily.vue";
import Settings from "./pages/settings.vue";

export const router = createRouter({
  history: createWebHistory("/slack_emoji_viewer/"),
  routes: [
    {
      name: "index",
      path: "/",
      component: Index,
    },
    {
      name: "author",
      path: "/author",
      component: Author,
    },
    {
      name: "daily",
      path: "/daily",
      component: Daily,
    },
    {
      name: "settings",
      path: "/settings",
      component: Settings,
    },
  ],
});
