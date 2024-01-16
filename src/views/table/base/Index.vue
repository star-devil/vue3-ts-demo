<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-01-16 15:38:01
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
    suffix: "这是测试hhh",
  });
}
</script>

<template>
  <div class="content-wrap" :style="{ backgroundColor: bgColor }">
    Base Table
    <h4 @click="goDetail">Go detail</h4>
  </div>
</template>

<style lang="scss" scoped></style>
