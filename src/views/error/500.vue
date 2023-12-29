<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:31:06
 * @LastEditTime: 2023-12-29 17:53:36
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
      <a-button type="primary" @click="router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
