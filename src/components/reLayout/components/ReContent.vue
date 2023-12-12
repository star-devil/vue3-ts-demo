<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-12 11:30:07
 * @LastEditTime: 2023-12-12 11:30:55
 * @LastEditors: wangqiaoling
 * @Description: Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import type { CSSProperties } from "vue";
const contentStyle: CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
</script>

<template>
  <a-layout-content :style="contentStyle">Content</a-layout-content>
</template>

<style lang="scss" scoped></style>
