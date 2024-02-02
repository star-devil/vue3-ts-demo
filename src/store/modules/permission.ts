/*
 * @Author: wangqiaoling
 * @Date: 2024-02-02 14:51:14
 * @LastEditTime: 2024-02-02 15:18:23
 * @LastEditors: wangqiaoling
 * @Description: 权限路由处理
 */
import { constantMenus } from "@router";
import { ascending, filterNoPermissionTree, filterTree } from "@router/utils";
import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    },
  },
});
