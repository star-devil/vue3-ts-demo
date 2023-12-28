<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:39:08
 * @LastEditTime: 2023-12-28 14:03:56
 * @LastEditors: wangqiaoling
 * @Description: Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { borderColorSecondary, colorText } from "../theme/getTokenStore";
import LogoName from "./LogoName.vue";

const themeData = useThemeStore();
const layoutName = themeData.layoutName;

const borderColor = ref<string>("");
const sideColorText = ref<string>("");
watchEffect(() => {
  borderColor.value = borderColorSecondary();
  sideColorText.value = colorText();
});
</script>

<template>
  <a-layout-sider
    theme="light"
    :class="[
      're-side-bar',
      layoutName === 'mixinRight' ? 'right-side-bar' : 'left-side-bar',
    ]"
  >
    <div class="side-bar-logo-container">
      <span class="side-logo-link" v-if="layoutName === 'custom'">
        <LogoName />
      </span>
    </div>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.side-bar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;

  .side-logo-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.re-side-bar {
  color: v-bind(sideColorText);
}

.right-side-bar {
  border-left: 1px solid v-bind(borderColor);
}

.left-side-bar {
  border-right: 1px solid v-bind(borderColor);
}
</style>
