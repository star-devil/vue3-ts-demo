/*
 * @Author: wangqiaoling
 * @Date: 2024-01-03 14:50:55
 * @LastEditTime: 2024-04-30 09:31:12
 * @LastEditors: wangqiaoling
 * @Description: 处理动态路由的工具方法
 */

import { getAsyncRoutes } from "@api/mock/routes";
import { usePermissionStore } from "@store/modules/permission";
import { isAllEmpty } from "@utils/provideConfig";
import { storage } from "@utils/reStorage";
import { buildHierarchyTree } from "@utils/tree";
import { cloneDeep, filter, forEach, intersection } from "lodash";
import { RouteComponent, RouteRecordRaw } from "vue-router";
import { router } from "./index";

const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isAllEmpty(parentId)
    ? isAllEmpty(meta?.rank) ||
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

/** 过滤children长度为0的的目录，当目录下没有菜单时，会过滤此目录，目录没有赋予roles权限，当目录下只要有一个菜单有显示权限，那么此目录就会显示 */
// function filterChildrenTree(data: RouteComponent[]) {
//   console.log("filterChildrenTree--Data-333", data);
//   const newTree: any = filter(
//     cloneDeep(data),
//     (v: { children: any[] }) => v.children && v.children.length > 0
//   );
//   console.log("filterChildrenTree--newTree4444-", newTree);

//   forEach(newTree, (v) => v.children && (v.children = filterTree(v.children)));
//   return newTree;
// }

/** 判断两个数组彼此是否存在相同值 */
function isOneOfArray(a: Array<string>, b: Array<string>) {
  return Array.isArray(a) && Array.isArray(b)
    ? intersection(a, b).length > 0
      ? true
      : false
    : true;
}

/** 从storage里取出当前登陆用户的角色roles，过滤无权限的菜单 */
function filterNoPermissionTree(data: RouteComponent[]) {
  const currentRoles = storage.get("userRoles")?.roles ?? [];
  const newTree = cloneDeep(data).filter((v: any) =>
    isOneOfArray(v.meta?.roles, currentRoles)
  );
  newTree.forEach(
    (v: any) => v.children && (v.children = filterNoPermissionTree(v.children))
  );
  // return filterChildrenTree(newTree);
  return newTree;
}

/**
 * @description 通过指定 `key` 获取父级路径集合，默认 `key` 为 `path`
 * @param value 当前路径
 * @param routes 整体路由生成的菜单（静态、动态）
 * */
function getParentPaths(value: string, routes: RouteRecordRaw[], key = "path") {
  // 深度遍历查找
  function dfs(routes: RouteRecordRaw[], value: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 返回父级path
      if (item[key as keyof typeof item] === value) return parents;
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, value, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }

  return dfs(routes, value, []);
}

/** 查找对应 `path` 的路由信息 */
function findRouteByPath(path: string, routes: RouteRecordRaw[]): any {
  let res = routes.find((item: { path: string }) => {
    // 处理路由动态参数的情况：path 包含动态参数时
    if (item.path.indexOf(":") > -1) {
      const routePattern = item.path.replace(/:[^/]+/g, "[^/]+"); // 将:XX替换为正则表达式匹配任意值的模式
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(path);
    } else {
      return item.path == path;
    }
  });
  if (res) {
    return isProxy(res) ? toRaw(res) : res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        (routes[i].children as RouteRecordRaw[]).length > 0
      ) {
        res = findRouteByPath(path, routes[i].children as RouteRecordRaw[]);
        if (res) {
          return isProxy(res) ? toRaw(res) : res;
        }
      }
    }
    return null;
  }
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

/** 处理动态路由（后端返回的路由） */
function handleAsyncRoutes(routesList) {
  if (routesList.length === 0) {
    usePermissionStore().handleWholeMenus(routesList);
  } else {
    formatFlatteningRoutes(addAsyncRoutes(routesList)).map(
      (v: RouteRecordRaw) => {
        // 防止重复添加路由
        if (
          router.options.routes[0].children.findIndex(
            (value) => value.path === v.path
          ) !== -1
        ) {
          return;
        } else {
          // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
          router.options.routes[0].children.push(v);
          // 最终路由进行升序
          ascending(router.options.routes[0].children);
          if (!router.hasRoute(v?.name)) router.addRoute(v);
          const flattenRouters: any = router
            .getRoutes()
            .find((n) => n.path === "/");
          router.addRoute(flattenRouters);
        }
      }
    );
    usePermissionStore().handleWholeMenus(routesList);
  }
  addPathMatch();
}

/** 初始化路由（`new Promise` 写法防止在异步请求中造成无限循环） */
function initRouter() {
  return new Promise((resolve) => {
    getAsyncRoutes().then(({ data }) => {
      handleAsyncRoutes(cloneDeep(data));
      resolve(router);
    });
  });
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

/** 过滤后端传来的动态路由 重新生成规范路由 */
function addAsyncRoutes(arrRoutes: Array<RouteRecordRaw>) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  arrRoutes.forEach((v: RouteRecordRaw) => {
    // 将backstage属性加入meta，标识此路由为后端返回路由
    v.meta.backstage = true;
    // 父级的redirect属性取值：
    // 如果子级存在且父级的redirect属性不存在，默认取第一个子级的path；
    // 如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
    if (v?.children && v?.children.length && !v.redirect)
      v.redirect = v.children[0].path;
    // 父级的name属性取值：
    // 如果子级存在且父级的name属性不存在，默认取第一个子级的name；
    // 如果子级存在且父级的name属性存在，取存在的name属性，会覆盖默认值
    // （注意：测试中发现父级的name不能和子级name重复，如果重复会造成重定向无效（跳转404），所以这里给父级的name起名的时候后面会自动加上`Parent`，避免重复）
    if (v?.children && v?.children.length && !v.name)
      v.name = (v.children[0].name as string) + "Parent";
    // 对后端传component组件路径和不传做兼容
    // （如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致）
    const index = v?.component
      ? modulesRoutesKeys.findIndex((ev) => ev.includes(v.component as any))
      : modulesRoutesKeys.findIndex((ev) => ev.includes(v.path as any));
    if (index > -1) v.component = modulesRoutes[modulesRoutesKeys[index]];
    if (v?.children && v?.children.length) {
      addAsyncRoutes(v.children);
    }
  });
  return arrRoutes;
}

/** 获取所有菜单中的第一个菜单（顶级菜单）*/
function getTopMenu() {
  const hasChildren = usePermissionStore().wholeMenus[0]?.children[0];
  if (hasChildren) {
    return usePermissionStore().wholeMenus[0]?.children[0];
  } else {
    return usePermissionStore().wholeMenus[0];
  }
}

export {
  addAsyncRoutes,
  addPathMatch,
  ascending,
  filterNoPermissionTree,
  filterTree,
  findRouteByPath,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  getParentPaths,
  getTopMenu,
  initRouter,
  isOneOfArray,
};
