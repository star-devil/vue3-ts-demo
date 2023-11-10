import "ant-design-vue/dist/reset.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

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
