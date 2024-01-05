<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:31:06
 * @LastEditTime: 2024-01-05 15:34:10
 * @LastEditors: wangqiaoling
 * @Description: 服务器错误页面
-->
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="500" title="500" sub-title="抱歉，服务器发生了错误。">
    <template #extra>
      <a-button type="primary" @click="router.replace('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
