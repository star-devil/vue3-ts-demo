/*
 * @Author: wangqiaoling
 * @Date: 2024-01-03 14:50:55
 * @LastEditTime: 2024-01-05 16:15:09
 * @LastEditors: wangqiaoling
 * @Description: 处理动态路由的工具方法
 */

import { buildHierarchyTree } from "@utils/tree";
import { cloneDeep, filter, forEach, isEmpty } from "lodash";
import { RouteComponent, RouteRecordRaw } from "vue-router";
import { router } from "./index";

function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isEmpty(parentId)
    ? isEmpty(meta?.rank) ||
      (meta?.rank === 0 && name !== "Home" && path !== "/")
      ? true
      : false
    : false;
}

/** 按照路由中meta下的rank等级升序来排序路由 */
function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
    if (handRank(v)) v.meta.rank = index + 2;
  });
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank;
    }
  );
}

/** 过滤meta中showLink为false的菜单 */
function filterTree(data: RouteComponent[]) {
  const newTree: any = filter(
    cloneDeep(data),
    (v: { meta: { showLink: boolean } }) => v.meta.showLink !== false
  );
  forEach(newTree, (v) => v.children && (v.children = filterTree(v.children)));
  return newTree;
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: [],
      });
    } else {
      newRoutesList[0]?.children?.push({ ...v });
    }
  });
  return newRoutesList;
}

/** 无匹配页面时展示404 */
function addPathMatch() {
  if (!router.hasRoute("pathMatch")) {
    router.addRoute({
      path: "/:pathMatch(.*)",
      name: "pathMatch",
      redirect: "/error/404",
    });
  }
}

export {
  addPathMatch,
  ascending,
  filterTree,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
};
