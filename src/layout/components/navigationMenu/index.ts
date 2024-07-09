import { constantRoutes } from "@router";
import { findRouteByPath, getParentPaths } from "@router/utils";
import { renderIcon } from "@utils/renderIcon";
import type { ItemType } from "ant-design-vue";
import { SubMenuType } from "ant-design-vue/es/menu/src/interface";
import { RouteComponent } from "vue-router";

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
    icon: icon && renderIcon(icon),
    children,
    label,
    type,
  } as ItemType;
}
/**
 * @description 将路由转变为菜单
 * @param route 当前的路由表，不包含无需layout的页面
 */
export function transformRouteToMenu(route: RouteComponent[]): ItemType[] {
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
export function getMenuKey(routeData: any) {
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
