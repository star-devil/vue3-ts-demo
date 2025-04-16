<!--
 * @Description: 系统logo和名称
-->
<script setup lang="ts">
import { useThemeType } from "@/layout/hooks/useThemeType";
import { useThemeStore } from "@store/modules/setting";

// 动态改变标题颜色
const colorData = computed(() => {
  if (useThemeType().isLight && useThemeStore().headColor) {
    return "#FFFFFF";
  } else {
    return "unset";
  }
});
</script>

<template>
  <img class="layout-system-logo" src="/logo.svg" alt="logo" />
  <a-typography-title class="layout-system-name" :level="4"
    ><span class="name">VueKit</span></a-typography-title
  >
</template>

<style lang="scss" scoped>
.layout-system-name {
  .name {
    color: v-bind(colorData);
  }
}
</style>
