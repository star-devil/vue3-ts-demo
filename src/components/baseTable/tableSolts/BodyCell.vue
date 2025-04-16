<!--
 * @Description: 渲染用户自定义单元格
-->
<script setup lang="ts">
import { renderMap } from "../renderComponents";

defineProps(["columnType", "data"]);
</script>

<template>
  <component
    class="user-defined-cell"
    :is="renderMap.get(columnType)"
    :cellData="data"
  />
</template>

<style lang="scss" scoped></style>
