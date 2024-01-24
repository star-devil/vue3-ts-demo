<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-04 16:45:49
 * @LastEditTime: 2024-01-24 10:17:37
 * @LastEditors: wangqiaoling
 * @Description: layout导航菜单组件，根据路由动态生成
-->
<script setup lang="ts">
import { constantMenus, constantRoutes } from "@router";
import { filterTree, findRouteByPath, getParentPaths } from "@router/utils";
import { useThemeStore } from "@store/modules/setting";
import type { ItemType, MenuProps } from "ant-design-vue";
import { SubMenuType } from "ant-design-vue/es/menu/src/interface";
import { RouteComponent, RouteLocationRaw } from "vue-router";

const themeData = useThemeStore();
const layoutName = themeData.layoutName;
const router = useRouter();
const routeInfo = useRoute();

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
 * 菜单数据
 */
let items: ItemType[] = reactive([]);

// 处理菜单成menu需要的格式
/**
 * @description 转换对象结构
 * @param label 菜单项标题
 * @param key 唯一标志
 * @param icon 菜单图标
 * @param children 子菜单的菜单项
 * @param type 定义类型为 group 时，会作为分组处理
 */
function getItem(
  label: string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}
/**
 * @description 将路由转变为菜单
 * @param route 当前的路由表，不包含无需layout的页面
 */
function transformRouteToMenu(route: RouteComponent[]): ItemType[] {
  return route.map((item: any) => {
    const menuData: ItemType = getItem(
      item.meta.title,
      item.path === "/" ? item.redirect : item.path,
      item.meta.icon
    );
    if (item.children && item.children.length > 0) {
      (menuData as SubMenuType).children = transformRouteToMenu(item.children);
    }
    return menuData;
  });
}

/** 获取当前页面应该选中的菜单 */
function getMenuKey(routeData: any) {
  if (routeData.redirect) {
    return routeData.redirect;
  } else if (routeData.meta.showLink === false) {
    const parentsPathList = getParentPaths(
      routeData.path,
      constantRoutes,
      "path"
    );
    const parentPath = parentsPathList.at(-1);
    if (parentPath) {
      return getMenuKey(findRouteByPath(parentPath, constantRoutes));
    }
  } else {
    return routeData.path;
  }
}

/**
 * 获取当前选中的菜单和父级菜单
 */
function getCurrentMenuInfo() {
  state.current = [getMenuKey(routeInfo) as string];
  // 去掉‘/’根路径；且当布局为顶部模式时，取消默认展开父级菜单
  state.openKeys =
    layoutName === "noSider"
      ? []
      : getParentPaths(routeInfo.path, constantRoutes, "path").slice(1);
}

/**
 * 点击菜单跳转
 */
const selectMenu: MenuProps["onSelect"] = (item) => {
  router.push(item.key as RouteLocationRaw);
};
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

// 生成导航菜单
onBeforeMount(() => {
  items = transformRouteToMenu(filterTree(constantMenus));
  getCurrentMenuInfo();
});
</script>

<template>
  <div class="navigation-menu">
    <a-menu
      v-model:selectedKeys="state.current"
      v-model:openKeys="state.openKeys"
      :mode="layoutName === 'noSider' ? 'horizontal' : 'inline'"
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
