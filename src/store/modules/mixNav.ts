/*
 * @Author: wangqiaoling
 * @Date: 2024-07-09 10:18:44
 * @LastEditTime: 2024-07-09 11:07:15
 * @LastEditors: wangqiaoling
 * @Description: 混合模式下菜单状态
 */
import { defineStore } from "pinia";

export const useMixNavStore = defineStore("mixNav", {
  state: () => ({
    currentParentMenuKey: "",
    showSider: false,
  }),
  getters: {
    getShowSider: (state) => state.showSider,
    getCurrentParentMenuKey: (state) => state.currentParentMenuKey,
  },
  actions: {
    getChildrenMenuByParentKey(parentKey: string | number) {
      this.currentParentMenuKey = parentKey;
    },
    showSiderMenu(flag: boolean) {
      this.showSider = flag;
    },
  },
});
