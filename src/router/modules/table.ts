/*
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:38
 * @LastEditTime: 2024-01-08 17:35:19
 * @LastEditors: wangqiaoling
 * @Description: 表格菜单
 */
export default {
  path: "/table",
  name: "Table",
  component: () => import("@/views/table/Index.vue"),
  meta: {
    icon: "homeFilled",
    title: "表格",
    rank: 1,
  },
  children: [
    {
      path: "/table/base-table",
      name: "BaseTable",
      component: () => import("@/views/table/base/Index.vue"),
      meta: {
        title: "基础表格",
      },
      children: [
        {
          path: "/table/base-table/detail",
          name: "BaseTableDetail",
          component: () => import("@/views/table/base/Detail.vue"),
          meta: {
            title: "详情",
            showLink: false,
          },
        },
      ],
    },
  ],
} as RouteConfigsTable;
