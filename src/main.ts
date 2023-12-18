/*
 * @Author: wangqiaoling
 * @Date: 2023-12-12 13:57:43
 * @LastEditTime: 2023-12-18 11:20:09
 * @LastEditors: wangqiaoling
 * @Description: 全局配置
 */
// 重置样式
import "./style.scss";
// 通用样式
import "./assets/styles/common.scss";
// routes
import router from "./router/index";

import { createApp } from "vue";
import App from "./App.vue";

// 全局注册`@iconify/vue`图标库
import { setupStore } from "@store";
import {
  FontIcon,
  IconifyIconOffline,
  IconifyIconOnline,
} from "./components/ReIcon";

const app = createApp(App);

app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

app.use(router);
setupStore(app);

app.mount("#app");
