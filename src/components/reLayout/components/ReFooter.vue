<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-12 11:31:15
 * @LastEditTime: 2023-12-12 11:31:49
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import type { CSSProperties } from "vue";
const footerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
</script>

<template>
  <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
</template>

<style lang="scss" scoped></style>
