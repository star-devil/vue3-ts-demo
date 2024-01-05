/*
 * @Author: wangqiaoling
 * @Date: 2024-01-03 14:31:22
 * @LastEditTime: 2024-01-05 16:38:11
 * @LastEditors: wangqiaoling
 * @Description: 其他无需layout页面，不需要展示菜单导航以及额外模块，只需要展示业务内容模块
 */
/**
 * @description 不需要展示菜单导航以及额外模块，只需要展示业务内容模块，且页面不在导航菜单内
 */
const remainingRoutes: { [key: string]: any } = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101,
    },
  },
  {
    path: "/error",
    redirect: "/error/403",
    meta: {
      icon: "informationLine",
      title: "异常页面",
      rank: 102,
    },
    children: [
      {
        path: "/error/403",
        name: "403",
        component: () => import("@/views/error/403.vue"),
        meta: {
          title: "403",
        },
      },
      {
        path: "/error/404",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        meta: {
          title: "404",
        },
      },
      {
        path: "/error/500",
        name: "500",
        component: () => import("@/views/error/500.vue"),
        meta: {
          title: "500",
        },
      },
    ],
  },
] as Array<RouteConfigsTable>;

export default remainingRoutes;
