<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:39:08
 * @LastEditTime: 2024-01-11 16:07:01
 * @LastEditors: wangqiaoling
 * @Description: Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import LogoName from "../components/logoName/Index.vue";
import { borderColorSecondary, colorText } from "../theme/getTokenStore";
import NavigationMenu from "./navigationMenu/Index.vue"; // 导航菜单

const themeData = useThemeStore();
const layoutName = themeData.layoutName;

const borderColor = ref<string>("");
const sideColorText = ref<string>("");
watchEffect(() => {
  borderColor.value = borderColorSecondary();
  sideColorText.value = colorText();
});
/** 根据配置改变logo样式 */
const changLogoStyle = computed(() => {
  let style = {};
  if (themeData.type === "light" && themeData.name === "custom") {
    if (themeData.headColor) {
      style = {
        backgroundColor: "#001529",
        color: "#fff",
      };
    }
  }
  return style;
});
/** 侧边栏主题切换 */
const changeTheme = computed(() => {
  if (layoutName.indexOf("mix") > -1) {
    return (
      themeData.type === "light" && themeData.headColor && !themeData.lightMenu
    );
  } else {
    return themeData.type === "light" && themeData.headColor;
  }
});
</script>

<template>
  <a-layout-sider
    :theme="changeTheme ? 'dark' : 'light'"
    :class="[
      're-side-bar',
      layoutName === 'mixinRight' ? 'right-side-bar' : 'left-side-bar',
    ]"
  >
    <div class="side-bar-logo-container" v-if="layoutName === 'custom'">
      <span class="side-logo-link" :style="changLogoStyle">
        <LogoName />
      </span>
    </div>
    <div class="menu-container">
      <NavigationMenu />
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
