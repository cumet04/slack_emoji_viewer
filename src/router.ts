import * as router from "vue-router";
import Index from "./pages/index.vue";
import List from "./pages/list.vue";
import Preferences from "./pages/preferences.vue";

export function createRouter(): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory("/slack_emoji_viewer/"),
    routes: [
      {
        path: "/",
        component: Index,
      },
      {
        path: "/daily",
        component: List,
      },
      {
        path: "/all",
        component: List,
      },
      {
        path: "/user",
        component: List,
      },
      {
        path: "/preferences",
        component: Preferences,
      },
    ],
  });

  return r;
}
