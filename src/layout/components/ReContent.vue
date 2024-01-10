<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-12 11:30:07
 * @LastEditTime: 2024-01-09 15:53:32
 * @LastEditors: wangqiaoling
 * @Description: Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { colorText } from "../theme/getTokenStore";

const themeData = useThemeStore();

const contentHeight: ComputedRef<string> = computed(() => {
  if (themeData.hasFooter) {
    return "calc(100vh - 48px - 53px)";
  } else {
    return "calc(100vh - 48px)";
  }
});

const contentColorText = ref<string>("");
watchEffect(() => {
  contentColorText.value = colorText();
});
</script>

<template>
  <a-layout-content>
    <router-view v-slot="{ Component }">
      <div class="content-container" :style="{ minHeight: contentHeight }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </div>
    </router-view>
  </a-layout-content>
</template>

<style lang="scss" scoped>
.content-container {
  padding: $main-gap;
  color: v-bind(contentColorText);
}
</style>
