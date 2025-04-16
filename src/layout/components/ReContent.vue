<!--
 * @Description: Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import ReBreadcrumb from "./breadcrumb/Index.vue"; // 面包屑
const themeData = useThemeStore();

const contentHeight: ComputedRef<string> = computed(() => {
  if (themeData.hasFooter) {
    return "calc(100vh - 48px - 53px)";
  } else {
    return "calc(100vh - 48px)";
  }
});
</script>

<template>
  <a-layout-content
    class="content-container"
    :style="{ minHeight: contentHeight }"
  >
    <ReBreadcrumb v-if="themeData.layoutName !== 'custom'" />
    <router-view v-slot="{ Component }">
      <div>
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
  color: var(--colorText);
}
</style>
