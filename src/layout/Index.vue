<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-13 14:29:26
 * @LastEditTime: 2024-04-28 14:14:42
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
const showSet = import.meta.env.VITE_SHOW_SET === "true";
</script>

<template>
  <ReLayout :waterMarkModel="waterMarkConfig" :needSet="showSet" />
</template>

<style lang="scss" scoped></style>
