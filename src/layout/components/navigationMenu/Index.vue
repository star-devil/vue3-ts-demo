<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-04 16:45:49
 * @LastEditTime: 2024-07-09 11:16:28
 * @LastEditors: wangqiaoling
 * @Description: layout导航菜单组件，根据路由动态生成
-->
<script setup lang="ts">
import { constantRoutes } from "@router";
import { filterTree, findRouteByPath, getParentPaths } from "@router/utils";
import { useMixNavStore } from "@store/modules/mixNav";
import { usePermissionStore } from "@store/modules/permission";
import { useThemeStore } from "@store/modules/setting";
import type { MenuProps } from "ant-design-vue";
import { RouteLocationRaw } from "vue-router";

import { getMenuKey, transformRouteToMenu } from "./index";

const routeInfo = useRoute();
const router = useRouter();

const themeData = useThemeStore();
const layoutName = themeData.layoutName;

/**
 * 菜单主题切换
 */
const changeTheme = computed(() => {
  if (layoutName.indexOf("mix") > -1) {
    return (
      themeData.type === "light" && themeData.headColor && !themeData.lightMenu
    );
  } else {
    return themeData.type === "light" && themeData.headColor;
  }
});

/**
 * 菜单数据
 */
let items = ref([]);

/**
 * 控制菜单选中和展开的一些参数
 */
const state = reactive<{
  current: string[];
  openKeys: string[];
}>({
  current: [],
  openKeys: [],
});

/**
 * 获取当前选中的菜单和父级菜单
 */
function getCurrentMenuInfo() {
  // 如果使用了后端返回的路由，items=usePermissionStore().wholeMenus;否则items=constantMenus
  items.value = transformRouteToMenu(
    filterTree(usePermissionStore().wholeMenus)
  );

  state.current = [getMenuKey(routeInfo) as string];
  // 去掉‘/’根路径；且当布局为顶部模式时，取消默认展开父级菜单
  state.openKeys =
    layoutName === "noSider"
      ? []
      : getParentPaths(routeInfo.path, constantRoutes, "path").slice(1);

  if (layoutName.indexOf("mix") > -1) {
    hasChildrenMenu(state.openKeys[0]);
    items.value = flatten(items.value);
  }
}

/** 混合模式下判断当前点击菜单有无子菜单 */
function hasChildrenMenu(key: string) {
  // 判断有无子菜单
  const childrenMenu = findRouteByPath(
    key,
    filterTree(usePermissionStore().wholeMenus)
  )?.children;
  if (childrenMenu) {
    state.current = state.openKeys;
    useMixNavStore().showSiderMenu(true);
    useMixNavStore().getChildrenMenuByParentKey(key);
  } else {
    useMixNavStore().showSiderMenu(false);
  }
}

/**
 * 点击菜单跳转
 */
const selectMenu: MenuProps["onSelect"] = (item) => {
  if (layoutName.indexOf("mix") > -1) {
    hasChildrenMenu(item.key as string);
  }
  router.push(item.key as RouteLocationRaw);
};

/** 去掉菜单子节点，用于混合模式下的顶部菜单显示 */
function flatten(arr: any[]) {
  return arr.reduce((result, item) => {
    return result.concat(
      item,
      Array.isArray(item.children) ? (item.children = undefined) : undefined
    );
  }, []);
}

// 生成导航菜单
onBeforeMount(() => {
  getCurrentMenuInfo();
});
</script>

<template>
  <div class="navigation-menu">
    <a-menu
      v-model:selectedKeys="state.current"
      v-model:openKeys="state.openKeys"
      :mode="
        layoutName === 'noSider' || layoutName.indexOf('mix') > -1
          ? 'horizontal'
          : 'inline'
      "
      :items="items"
      :theme="changeTheme ? 'dark' : 'light'"
      @select="selectMenu"
    >
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.ant-menu-light .ant-menu-item-selected {
  background-color: red !important;
}
</style>
