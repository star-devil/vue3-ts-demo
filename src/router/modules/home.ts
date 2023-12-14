/*
 * @Author: wangqiaoling
 * @Date: 2023-12-13 14:19:21
 * @LastEditTime: 2023-12-13 15:02:32
 * @LastEditors: wangqiaoling
 * @Description: 跳转到首页
 */
const Layout = () => import("@/layout/Index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "homeFilled",
    title: "首页",
    rank: 0,
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/home/HomeView.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
} as RouteConfigsTable;
