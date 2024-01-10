<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-04 16:45:49
 * @LastEditTime: 2024-01-10 11:01:20
 * @LastEditors: wangqiaoling
 * @Description: layout导航菜单组件，根据路由动态生成
-->
<script setup lang="ts">
import { constantMenus } from "@router";
import { filterTree } from "@router/utils";
import { useThemeStore } from "@store/modules/setting";
import type { ItemType, MenuProps } from "ant-design-vue";
import { SubMenuType } from "ant-design-vue/es/menu/src/interface";
import { RouteComponent } from "vue-router";

const themeData = useThemeStore();
const layoutName = themeData.layoutName;

// 临时菜单
const current = ref<string[]>(["mail"]);
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
  path: string,
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
    path,
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
      item.name,
      item.path,
      item.meta.icon
    );
    if (item.children && item.children.length > 0) {
      (menuData as SubMenuType).children = transformRouteToMenu(item.children);
    }
    return menuData;
  });
}

// 生成导航菜单
onBeforeMount(() => {
  items = transformRouteToMenu(filterTree(constantMenus));
});

const router = useRouter();

const selectMenu: MenuProps["onSelect"] = ({ item }) => {
  router.push(item.path);
};
</script>

<template>
  <div class="navigation-menu">
    <a-menu
      v-model:selectedKeys="current"
      :mode="layoutName === 'noSider' ? 'horizontal' : 'inline'"
      :items="items"
      @select="selectMenu"
    >
    </a-menu>
  </div>
</template>

<style lang="scss" scoped></style>
