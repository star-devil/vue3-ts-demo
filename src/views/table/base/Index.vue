<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-01-18 10:14:28
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { colorBgWrapper } from "@/layout/theme/getTokenStore";
import { emitter } from "@utils/provideConfig";

const bgColor = ref<string>("");
watchEffect(() => {
  bgColor.value = colorBgWrapper();
});

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
  <div class="content-wrap" :style="{ backgroundColor: bgColor }">
    Base Table
    <a-button type="primary" @click="goDetail">Go detail</a-button>
  </div>
</template>

<style lang="scss" scoped></style>
