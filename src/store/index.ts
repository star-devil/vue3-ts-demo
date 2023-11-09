import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  // 定义 store 模块的名字
  id: "counter",
  // 定义状态
  state: () => ({
    count: 0,
  }),
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
