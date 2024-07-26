<!--
 * @Author: wangqiaoling
 * @Date: 2024-04-11 10:58:39
 * @LastEditTime: 2024-07-26 13:29:28
 * @LastEditors: wangqiaoling
 * @Description: 单元格内渲染长文本（段落）。两种方式：大量文本推荐优先使用 expandable，少量文本推荐使用 tooltip
-->
<script setup lang="ts">
const props = defineProps(["cellData"]);
const extraProps = props.cellData.column.extraProps || {};
let witchType = computed(() => {
  return extraProps.ellipsis?.expandable;
});
</script>

<template>
  <fold-typography
    v-if="witchType"
    v-bind.prop="extraProps.ellipsis"
    :text="cellData.text"
  />

  <a-typography-text
    v-else
    v-bind.prop="extraProps"
    :style="{ width: cellData.column.width - 20 + 'px' }"
    :ellipsis="{ tooltip: cellData.text, ...extraProps.ellipsis }"
    :content="cellData.text"
  />
</template>
