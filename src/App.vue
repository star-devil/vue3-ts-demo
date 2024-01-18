<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:13:48
 * @LastEditTime: 2024-01-18 10:48:42
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN"; // 使用中文
import dayjs from "dayjs"; // 日期本地化
import "dayjs/locale/zh-cn";
import type { ThemeColors } from "./layout/theme";
import { themeColors } from "./layout/theme";

dayjs.locale("zh-cn");
const locale = zhCN;
// 设置需要的布局和主题
const themes = useThemeStore();
if (!themes.name) {
  // 如果缓存中不存在主题配置， 则使用默认配置
  themes.setTheme("noSider", false, "light", "black", 60 * 24 * 7);
}
// 动态切换暗黑和明亮主题、主题颜色
const themeAlgorithm = ref(theme.defaultAlgorithm);
let color: keyof ThemeColors = themes.color || "black";
const themeToken = ref<any>(themeColors[color]);
watchEffect(() => {
  // 当前主题类型
  themeAlgorithm.value =
    themes.themeType === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm;
  // 当前主题颜色
  color = themes.themeColor;
  themeToken.value = themeColors[color];
});

// 页面重载
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
</script>

<template>
  <div>
    <a-config-provider
      :locale="locale"
      :theme="{
        algorithm: themeAlgorithm,
        token: themeToken.token,
        components: themeToken.components,
      }"
    >
      <router-view v-if="isRouterAlive" />
    </a-config-provider>
  </div>
</template>
