<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 15:25:55
 * @LastEditTime: 2024-03-25 15:29:48
 * @LastEditors: wangqiaoling
 * @Description: 默认单元格渲染为文字
-->
<script setup lang="ts">
defineProps(["record", "text"]);
</script>

<template>
  <span>{{ text }}</span>
</template>
