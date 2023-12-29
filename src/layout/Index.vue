<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-13 14:29:26
 * @LastEditTime: 2023-12-29 16:26:21
 * @LastEditors: wangqiaoling
 * @Description: 布局入口文件
-->
<script setup lang="ts">
import ReLayout from "./components/ReLayout.vue";
const waterMarkConfig = {
  font: {
    content: "Egg‘s demo",
    fontSize: 14,
  },
};
const showSet = JSON.parse(import.meta.env.VITE_SHOW_SET);
</script>

<template>
  <ReLayout :waterMarkModel="waterMarkConfig" :needSet="showSet" />
</template>

<style lang="scss" scoped></style>
