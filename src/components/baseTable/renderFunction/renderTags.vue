<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:29:47
 * @LastEditTime: 2024-03-26 09:33:11
 * @LastEditors: wangqiaoling
 * @Description: 渲染标签
-->
<script setup lang="ts">
defineProps(["cellData"]);
</script>

<template>
  <span>
    <a-tag
      v-for="tag in cellData.record.tags"
      :key="tag"
      :color="
        tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
      "
    >
      {{ tag.toUpperCase() }}
    </a-tag>
  </span>
</template>
