<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-13 14:29:26
 * @LastEditTime: 2023-12-13 17:31:36
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
</script>

<template>
  <ReLayout layoutName="noSider" :waterMarkModel="waterMarkConfig" />
</template>

<style lang="scss" scoped></style>
