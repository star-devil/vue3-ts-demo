/*
 * @Author: wangqiaoling
 * @Date: 2024-07-11 11:12:58
 * @LastEditTime: 2024-07-25 16:15:36
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
    {
      path: "/components/copy-button",
      name: "CopyButton",
      component: () => import("@/views/componentsDemo/CopyButtonDemo.vue"),
      meta: {
        title: "复制按钮",
        keepAlive: true,
      },
    },
  ],
} as RouteConfigsTable;
