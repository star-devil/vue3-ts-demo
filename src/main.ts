import { createApp } from "vue";
import App from "./App.vue";
// 重置样式
import "./style.scss";
// 通用样式
import "./assets/styles/common.scss";

// routes
import router from "./router/index";
// pinia
import { createPinia } from "pinia";

// 全局悬浮应用
// import EmbedLayout from '@/components/float/EmbedLayout.vue'

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia);
app.mount("#app");
// 注册全局悬浮应用
// const embedApp = createApp(EmbedLayout)
// embedApp.mount('#embedBox')
