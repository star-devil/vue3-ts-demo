/*
 * @Author: wangqiaoling
 * @Date: 2024-07-11 11:12:58
 * @LastEditTime: 2024-07-12 15:25:18
 * @LastEditors: wangqiaoling
 * @Description: 组件示例菜单
 */
export default {
  path: "/components",
  name: "Components",
  redirect: "/components/code-editor",
  meta: {
    icon: "components",
    title: "组件示例",
    breadLink: false,
    rank: 2,
  },
  children: [
    {
      path: "/components/code-editor",
      name: "CodeEditor",
      component: () => import("@/views/componentsDemo/CodeEditorDemo.vue"),
      meta: {
        title: "代码编辑器",
        keepAlive: true,
      },
    },
  ],
} as RouteConfigsTable;
