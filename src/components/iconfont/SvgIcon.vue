<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:02:13
 * @LastEditTime: 2023-12-19 15:37:28
 * @LastEditors: wangqiaoling
 * @Description: 封装iconfont,使其能够离线使用
-->
<template>
  <span class="anticon">
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconClassName" :fill="color" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "rgba(0, 0, 0, 0.88)",
  },
  size: {
    type: String,
    default: "1em",
  },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>

<style scoped>
.svg-icon {
  position: relative;

  /* v-bind 是 Vue3 才支持的功能，可以将 CSS 的值与 js 的值绑定 */
  width: v-bind("props.size");
  height: v-bind("props.size");
  vertical-align: -2px;
  fill: currentColor;
}
</style>
