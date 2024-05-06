<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 15:25:55
 * @LastEditTime: 2024-05-06 16:09:12
 * @LastEditors: wangqiaoling
 * @Description: 默认单元格渲染为文字
-->
<script setup lang="ts">
defineProps(["cellData"]);
</script>

<template>
  <span>{{ cellData.text }}</span>
</template>
