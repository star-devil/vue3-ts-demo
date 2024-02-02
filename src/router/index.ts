/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:45:50
 * @LastEditTime: 2024-02-02 17:11:56
 * @LastEditors: wangqiaoling
 * @Description: 简单路由配置
 */
import NProgress from "@/utils/progress";
import { storage } from "@utils/reStorage";
import { buildHierarchyTree } from "@utils/tree";

import {
  RouteComponent,
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from "vue-router";
import {
  ascending,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  getTopMenu,
  initRouter,
  isOneOfArray,
} from "./utils";

import { usePermissionStore } from "@store/modules/permission";
import { useUserInfo } from "@store/modules/userInfo";
import { TokenKey } from "@utils/auth";
import { isAllEmpty } from "@utils/provideConfig";
import { Cookies } from "@utils/reCookies";
import remainingRouter from "./modules/remaining";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts", "!./modules/**/error.ts"],
  {
    eager: true,
  }
);
/** 原始静态路由（未做任何处理） */
const routes: any[] = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity)
);

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path;
});

// 路由
export const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  scrollBehavior(_to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to: ToRouteType, _from, next) => {
  const userInfo = Cookies.get(TokenKey);
  const userRoles = storage.get("userRoles");
  NProgress.start();
  /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }

  if (userInfo) {
    // 无权限跳转403页面
    if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userRoles?.roles)) {
      next({ path: "/error/403" });
    }
    if (_from?.name) {
      toCorrectRoute();
    } else {
      if (
        usePermissionStore().wholeMenus.length === 0 &&
        to.path !== "/login"
      ) {
        initRouter().then((router: Router) => {
          getTopMenu();
          // 确保动态路由完全加入路由列表并且不影响静态路由（注意：动态路由刷新时router.beforeEach可能会触发两次，第一次触发动态路由还未完全添加，第二次动态路由才完全添加到路由列表，如果需要在router.beforeEach做一些判断可以在to.name存在的条件下去判断，这样就只会触发一次）
          if (isAllEmpty(to.name)) router.push(to.fullPath);
        });
      }
      toCorrectRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        // 清除用户信息、全部缓存和token
        useUserInfo().removeAllInfoAndLogOut();
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
// 导出
export default router;
