import { createApp } from "vue";
import { router } from "./router";
import App from "./layouts/default.vue";
import "./assets/css/base.css";

createApp(App).use(router).mount("#app");
