<!--
 * @Description: Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import LogoName from "../components/logoName/Index.vue";
import NavigationMenu from "./navigationMenu/Index.vue"; // 导航菜单
import MixNav from "./navigationMenu/MixNav.vue"; // 导航菜单
const themeData = useThemeStore();
const layoutName = themeData.layoutName;

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
/** 收起侧边栏 */
const collapsed = ref<boolean>(false);
</script>

<template>
  <a-layout-sider
    :theme="changeTheme ? 'dark' : 'light'"
    :class="[
      're-side-bar',
      layoutName === 'mixinRight' ? 'right-side-bar' : 'left-side-bar',
    ]"
    v-model:collapsed="collapsed"
    collapsible
  >
    <div class="side-bar-logo-container" v-if="layoutName === 'custom'">
      <span class="side-logo-link" :style="changLogoStyle">
        <LogoName />
      </span>
    </div>
    <div class="menu-container">
      <MixNav v-if="layoutName.includes('mixin')" />
      <NavigationMenu v-else />
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
  box-sizing: content-box;
  color: var(--colorText);
}

.right-side-bar {
  border-left: 1px solid var(--colorBorderSecondary);
}

.left-side-bar {
  border-right: 1px solid var(--colorBorderSecondary);
}
</style>
