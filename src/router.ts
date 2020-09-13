import * as router from "vue-router";
import Index from "./pages/index.vue";
import Preferences from "./pages/preferences.vue";

export function createRouter(): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory("/slack_emoji_viewer/"),
    routes: [
      {
        name: "index",
        path: "/",
        component: Index,
      },
      {
        name: "preferences",
        path: "/preferences",
        component: Preferences,
      },
    ],
  });

  return r;
}
