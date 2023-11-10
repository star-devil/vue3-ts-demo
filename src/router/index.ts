import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/treatment",
  },
  {
    path: "/treatment",
    name: "treatment",
    component: async () => await import("../views/AppViews/Treatment.vue"),
  },
  {
    path: "/medicine",
    name: "medicine",
    component: async () => await import("../views/AppViews/Medicine.vue"),
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
