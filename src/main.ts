import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

// routes
import router from "./router/index";
// pinia
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia);
app.mount("#app");
