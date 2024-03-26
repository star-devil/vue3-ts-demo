<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:31:13
 * @LastEditTime: 2024-03-25 16:53:25
 * @LastEditors: wangqiaoling
 * @Description: 操作按钮组合
-->
<script setup lang="ts">
import { DownOutlined } from "@ant-design/icons-vue";
defineProps(["cellData"]);
</script>

<template>
  <span>
    <a>Invite 一 {{ cellData.record.name }}</a>
    <a-divider type="vertical" />
    <a>Delete</a>
    <a-divider type="vertical" />
    <a class="ant-dropdown-link">
      More actions
      <down-outlined />
    </a>
  </span>
</template>

<style lang="scss" scoped></style>
