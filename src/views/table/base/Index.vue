<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-03-21 14:50:20
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { emitter } from "@utils/provideConfig";

const router = useRouter();

function goDetail() {
  router.push("/table/base-table/detail");

  emitter.emit("extraBreadcrumbName", {
    path: "/table/base-table/detail",
    suffix: "-这是我的后缀",
  });
}
</script>

<template>
  <div class="content-wrap">
    Base Table
    <a-button type="primary" @click="goDetail">Go detail</a-button>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  background-color: var(--colorPrimaryLight);
}
</style>
