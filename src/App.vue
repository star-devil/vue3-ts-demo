<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:13:48
 * @LastEditTime: 2023-12-19 17:32:00
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN"; // 使用中文
import dayjs from "dayjs"; // 日期本地化
import "dayjs/locale/zh-cn";
import { themeColors } from "./layout/theme";

dayjs.locale("zh-cn");
const locale = zhCN;
// 设置需要的布局和主题
const themes = useThemeStore();
themes.setTheme("noSider", true, "light", 60 * 24 * 7);
// 动态切换暗黑和明亮主题
const themeAlgorithm = ref(theme.defaultAlgorithm);
const themeToken = ref<object>(themeColors.black);
watchEffect(() => {
  themeAlgorithm.value =
    themes.themeType === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm;
  themeToken.value =
    themes.themeType === "light"
      ? themeColors.black
      : themeColors.darkAlgorithmblack;
});
</script>

<template>
  <div>
    <a-config-provider
      :locale="locale"
      :theme="{
        algorithm: themeAlgorithm,
        token: themeToken,
      }"
    >
      <router-view />
    </a-config-provider>
  </div>
</template>
