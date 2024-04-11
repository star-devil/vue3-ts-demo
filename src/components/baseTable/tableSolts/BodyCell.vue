<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:56:37
 * @LastEditTime: 2024-04-11 10:59:22
 * @LastEditors: wangqiaoling
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
  ></component>
</template>

<style lang="scss" scoped></style>
