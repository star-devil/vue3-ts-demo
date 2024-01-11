<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-01-11 17:33:05
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { colorBgWrapper } from "@/layout/theme/getTokenStore";

const bgColor = ref<string>("");
watchEffect(() => {
  bgColor.value = colorBgWrapper();
});
</script>

<template>
  <div class="content-wrap" :style="{ backgroundColor: bgColor }">
    Base Table
  </div>
</template>

<style lang="scss" scoped></style>
