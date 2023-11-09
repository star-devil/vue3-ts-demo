import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
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
