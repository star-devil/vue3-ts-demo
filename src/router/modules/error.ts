/*
 * @Author: wangqiaoling
 * @Date: 2023-12-29 17:30:25
 * @LastEditTime: 2023-12-29 17:32:26
 * @LastEditors: wangqiaoling
 * @Description: 异常页面
 */
export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    icon: "informationLine",
    title: "异常页面",
    // showLink: false,
    rank: 9,
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
} as RouteConfigsTable;
