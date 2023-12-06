/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2023-12-06 16:10:21
 * @LastEditors: wangqiaoling
 * @Description: 定义pinia（替代vuex）容器
 */
import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  // 定义 store 模块的名字
  id: "counter",
  // 定义状态
  state: () => ({
    count: 0,
  }),
  /**
   * 类似组件的 computed, 用来封装计算属性, 具有缓存特性
   */
  getters: {},
  // 定义操作
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
