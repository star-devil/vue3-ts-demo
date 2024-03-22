<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-03-22 16:13:30
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
    <a-button type="primary" @click="goDetail">Go detail</a-button>
    <base-table></base-table>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  background-color: var(--colorPrimaryLight);
}
</style>
