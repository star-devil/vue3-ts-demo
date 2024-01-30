/*
 * @Author: wangqiaoling
 * @Date: 2024-01-24 13:27:15
 * @LastEditTime: 2024-01-24 14:00:36
 * @LastEditors: wangqiaoling
 * @Description: 模拟服务器返回权限路由表
 */
import { MockMethod } from "vite-plugin-mock";

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    rank: 10,
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.permissionPage",
        roles: ["admin", "common"],
      },
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.permissionButton",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"],
      },
    },
  ],
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [permissionRouter],
      };
    },
  },
] as MockMethod[];
