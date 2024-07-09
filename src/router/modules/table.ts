/*
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:38
 * @LastEditTime: 2024-07-08 13:47:02
 * @LastEditors: wangqiaoling
 * @Description: 表格菜单
 */
export default {
  path: "/table",
  name: "Table",
  redirect: "/table/base-table",
  meta: {
    icon: "table",
    title: "表格",
    breadLink: false,
    rank: 1,
  },
  children: [
    {
      path: "/table/base-table",
      name: "BaseTable",
      component: () => import("@/views/table/base/Index.vue"),
      meta: {
        title: "基础表格",
        keepAlive: true,
      },
      children: [
        {
          path: "/table/base-table/detail",
          name: "BaseTableDetail",
          component: () => import("@/views/table/base/Detail.vue"),
          meta: {
            title: "详情",
            showLink: true,
            roles: ["admin"],
          },
        },
      ],
    },
  ],
} as RouteConfigsTable;
