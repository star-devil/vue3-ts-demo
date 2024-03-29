<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:30:39
 * @LastEditTime: 2024-03-28 17:34:56
 * @LastEditors: wangqiaoling
 * @Description: 单元格a标签
-->
<script setup lang="ts">
const props = defineProps(["cellData"]);
const aProps = props.cellData.column.extraProps;
</script>

<template>
  <a v-bind="aProps">
    {{ cellData.text }}
  </a>
</template>

<style lang="scss" scoped></style>
