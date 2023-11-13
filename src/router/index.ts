/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:45:50
 * @LastEditTime: 2023-11-13 11:15:42
 * @LastEditors: wangqiaoling
 * @Description: 简单路由配置
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: async () => await import("../views/HomeView.vue"),
  },
  // {
  // 配置404页面
  // path: '/:catchAll(.*)',
  // name: '404',
  // component: () => import(''),
  // }
];
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 导出
export default router;
