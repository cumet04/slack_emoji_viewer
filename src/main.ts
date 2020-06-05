import { createApp } from "vue";
import { createStore } from "./store";
import { router } from "./router";
import App from "./layouts/default.vue";
import "./assets/css/base.css";

createApp(App).use(createStore()).use(router).mount("#app");