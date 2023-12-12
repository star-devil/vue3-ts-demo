<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-13 11:14:56
 * @LastEditTime: 2023-12-12 13:44:10
 * @LastEditors: wangqiaoling
 * @Description: 主页面
-->
<script setup lang="ts">
const waterMarkConfig = {
  font: {
    content: "Egg‘s demo",
    fontSize: 14,
  },
};
</script>

<template>
  <Relayout layoutName="custom" :waterMarkModel="waterMarkConfig" />
</template>

<style lang="scss" scoped></style>
