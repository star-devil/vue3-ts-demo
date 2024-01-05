<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:31:06
 * @LastEditTime: 2024-01-05 15:34:13
 * @LastEditors: wangqiaoling
 * @Description: 页面不存在
-->
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" @click="router.replace('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
