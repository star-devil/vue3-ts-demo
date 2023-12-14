<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:39:08
 * @LastEditTime: 2023-12-13 17:26:12
 * @LastEditors: wangqiaoling
 * @Description: Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store";
import LogoName from "./LogoName.vue";

const themeData = useThemeStore();
const layoutName = themeData.layoutName;
</script>

<template>
  <a-layout-sider
    theme="light"
    :class="[layoutName === 'mixinRight' ? 'right-side-bar' : 'left-side-bar']"
  >
    <div class="side-bar-logo-container">
      <a href="" class="side-logo-link" v-if="layoutName === 'custom'">
        <LogoName />
      </a>
    </div>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.side-bar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;
  color: #333;

  .side-logo-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  a,
  a:focus,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  a:active,
  a:focus {
    outline: none;
  }
}

.right-side-bar {
  border-left: 1px solid $border-color;
}

.left-side-bar {
  border-right: 1px solid $border-color;
}
</style>
