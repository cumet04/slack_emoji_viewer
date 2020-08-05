import * as router from "vue-router";
import Index from "./pages/index.vue";
import Author from "./pages/author.vue";
import Daily from "./pages/daily.vue";
import Settings from "./pages/settings.vue";
import { Store } from "./store";

export function createRouter(store: Store): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory("/slack_emoji_viewer/"),
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

  r.beforeEach(function (to, _, next) {
    if (to.path != "/settings" && !store.workspace.current()) {
      next("/settings");
    } else {
      next();
    }
  });

  return r;
}
