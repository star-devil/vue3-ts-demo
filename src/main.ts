/*
 * @Author: wangqiaoling
 * @Date: 2023-12-12 13:57:43
 * @LastEditTime: 2023-12-19 15:08:27
 * @LastEditors: wangqiaoling
 * @Description: 全局配置
 */
// 重置样式
import "./style.scss";
// 通用样式
import "./assets/styles/common.scss";
// routes
import router from "./router/index";

import { setupStore } from "@store";
import { createApp } from "vue";
import App from "./App.vue";
// 全局注册封装的iconfont。图标修改之后请务必更新src/assets/iconfont/index.js文件
import "./assets/iconfont/index";
import SvgIcon from "./components/iconfont/SvgIcon.vue";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.use(router);
setupStore(app);

app.mount("#app");
