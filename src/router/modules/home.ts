/*
 * @Author: wangqiaoling
 * @Date: 2023-12-13 14:19:21
 * @LastEditTime: 2024-03-22 10:08:45
 * @LastEditors: wangqiaoling
 * @Description: 首页，展示布局结构的入口，且永远排在菜单第一项，不可删除
 */
const Layout = () => import("@/layout/Index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "home",
    title: "首页",
    rank: 0,
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/home/HomeView.vue"),
      meta: {
        title: "欢迎",
        showLink: false,
        keepAlive: true,
      },
    },
  ],
} as RouteConfigsTable;
