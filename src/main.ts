import { createApp } from "vue";
import { createStore } from "./store";
import { createRouter } from "./router";
import App from "./App.vue";
import "./assets/css/base.css";

const store = createStore();
const router = createRouter();
createApp(App).use(store).use(router).mount("#app");
