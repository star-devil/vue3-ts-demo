<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-12 11:31:15
 * @LastEditTime: 2023-12-28 10:55:57
 * @LastEditors: wangqiaoling
 * @Description: 底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { textDescriptionColor } from "../theme/getTokenStore";

const textColor = ref<string>("");
watchEffect(() => {
  textColor.value = textDescriptionColor();
});
</script>

<template>
  <a-layout-footer class="footer-container">Footer</a-layout-footer>
</template>

<style lang="scss" scoped>
.footer-container {
  padding: $main-gap;
  font-size: 12px;
  color: v-bind("textColor");
  text-align: left;
}
</style>
