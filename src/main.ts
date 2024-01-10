/*
 * @Author: wangqiaoling
 * @Date: 2023-12-12 13:57:43
 * @LastEditTime: 2024-01-10 10:41:12
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
import { createFromIconfontCN } from "@ant-design/icons-vue";

const app = createApp(App);

const IconFont = createFromIconfontCN({
  scriptUrl: new URL("./assets/iconfont/index", import.meta.url).href, // 在 iconfont.cn 上生成
});
app.component("IconFont", IconFont);

window.IconFont = IconFont;

app.use(router);
setupStore(app);

app.mount("#app");
