<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:56:37
 * @LastEditTime: 2024-03-25 15:31:14
 * @LastEditors: wangqiaoling
 * @Description: 渲染用户自定义单元格
-->
<script setup lang="ts">
import { renderMap } from "../renderComponents";
defineProps(["columnType", "record", "text"]);
</script>

<template>
  <component
    class="userDefinedCell"
    :is="renderMap.get(columnType)"
    :record="record"
    :text="text"
  ></component>
</template>

<style lang="scss" scoped></style>
