<!--
 * @Description: layout混合导航模式菜单组件，一级菜单在顶部显示，二级菜单在侧边栏显示
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
const items = ref([]);

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

const currentParentKey = ref("");

/**
 * 获取当前选中的菜单和父级菜单
 */
function getCurrentMenuInfo() {
  state.current = [getMenuKey(routeInfo) as string];
  // 去掉‘/’根路径；且当布局为顶部模式时，取消默认展开父级菜单
  state.openKeys = getParentPaths(routeInfo.path, constantRoutes, "path").slice(
    1
  );

  // 如果使用了后端返回的路由，items=usePermissionStore().wholeMenus;否则items=constantMenus
  items.value = transformRouteToMenu(
    findRouteByPath(
      currentParentKey.value,
      filterTree(usePermissionStore().wholeMenus)
    )?.children
  );
}

/**
 * 点击菜单跳转
 */
const selectMenu: MenuProps["onSelect"] = (item) => {
  router.push(item.key as RouteLocationRaw);
};

watchEffect(() => {
  currentParentKey.value = useMixNavStore().getCurrentParentMenuKey;
  // 生成导航菜单
  getCurrentMenuInfo();
});
</script>

<template>
  <div class="navigation-menu">
    <a-menu
      v-model:selectedKeys="state.current"
      v-model:openKeys="state.openKeys"
      mode="inline"
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
