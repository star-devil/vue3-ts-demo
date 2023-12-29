<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:31:06
 * @LastEditTime: 2023-12-29 17:53:05
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
      <a-button type="primary" @click="router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
