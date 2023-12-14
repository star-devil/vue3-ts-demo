/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2023-12-13 16:51:52
 * @LastEditors: wangqiaoling
 * @Description: 定义pinia（替代vuex）容器
 */
import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  // 主题、布局数据
  id: "themeData",
  // 定义状态
  state: () => ({
    layoutName: "",
    hasFooter: true,
  }),
  /**
   * 类似组件的 computed, 用来封装计算属性, 具有缓存特性
   */
  getters: {},
  // 定义操作
  actions: {},
});
