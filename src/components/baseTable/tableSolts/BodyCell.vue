<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:56:37
 * @LastEditTime: 2024-03-26 09:20:05
 * @LastEditors: wangqiaoling
 * @Description: 渲染用户自定义单元格
-->
<script setup lang="ts">
import { renderMap } from "../renderComponents";
defineProps(["columnType", "data"]);
</script>

<template>
  <component
    class="userDefinedCell"
    :is="renderMap.get(columnType)"
    :cellData="data"
  ></component>
</template>

<style lang="scss" scoped></style>
