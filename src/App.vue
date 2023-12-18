<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:13:48
 * @LastEditTime: 2023-12-15 16:30:20
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN"; // 使用中文
import dayjs from "dayjs"; // 日期本地化
import { themeColors } from "./layout/theme";

import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const locale = zhCN;
</script>

<template>
  <div>
    <a-config-provider :locale="locale" :theme="themeColors.black">
      <router-view />
    </a-config-provider>
  </div>
</template>
