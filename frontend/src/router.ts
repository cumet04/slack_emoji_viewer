import * as router from "vue-router";
import Index from "./pages/index.vue";
import All from "./pages/all.vue";
import Daily from "./pages/daily.vue";
import User from "./pages/user.vue";
import Preferences from "./pages/preferences.vue";
import NotFound from "./pages/404.vue";

export function createRouter(): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory(),
    routes: [
      {
        path: "/",
        component: Index,
      },
      {
        path: "/daily",
        component: Daily,
      },
      {
        path: "/all",
        component: All,
      },
      {
        path: "/user",
        component: User,
      },
      {
        path: "/preferences",
        component: Preferences,
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  });

  return r;
}
