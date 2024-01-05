<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:31:06
 * @LastEditTime: 2024-01-05 15:34:17
 * @LastEditors: wangqiaoling
 * @Description: 无权限页面
-->
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="403" title="403" sub-title="抱歉，你没有此页面的访问权限。">
    <template #extra>
      <a-button type="primary" @click="router.replace('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
