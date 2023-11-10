<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-10 14:46:25
 * @LastEditTime: 2023-11-10 16:38:25
 * @LastEditors: wangqiaoling
 * @Description: 诊疗助手
-->
<script setup lang="ts">
import { useSwitch } from "./index.ts";
const { loadList, listData } = useSwitch();
onMounted(() => {
  loadList();
});
</script>

<template>
  <div class="content-box">
    <Chat />
  </div>
  <ItemSwitcher :itemData="listData" />
</template>

<style lang="scss" scoped></style>
