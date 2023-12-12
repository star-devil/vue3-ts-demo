<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:13:48
 * @LastEditTime: 2023-12-12 13:37:04
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN"; // 使用中文
import dayjs from "dayjs"; // 日期本地化

import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const locale = zhCN;
</script>

<template>
  <div>
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
