<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-12 11:31:15
 * @LastEditTime: 2024-01-19 11:06:25
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
  <a-layout-footer class="footer-container ilflex-bc">
    <span class="left-footer"> ©2024 EGG </span>
    <span class="right-footer">
      <a-space>
        <a
          href="https://github.com/star-devil/vue3-ts-demo"
          target="_blank"
          class="link-text"
          >关于</a
        >
        <a class="link-text">联系我们</a>
      </a-space>
    </span>
  </a-layout-footer>
</template>

<style lang="scss" scoped>
.footer-container {
  padding: $main-gap;
  font-size: 12px;
  color: v-bind(textColor);

  .link-text {
    font-size: 12px;
    color: v-bind(textColor);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
