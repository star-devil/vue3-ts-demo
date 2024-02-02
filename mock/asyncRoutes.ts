/*
 * @Author: wangqiaoling
 * @Date: 2024-01-24 13:27:15
 * @LastEditTime: 2024-02-02 14:12:48
 * @LastEditors: wangqiaoling
 * @Description: 模拟服务器返回权限路由表
 */
import { MockMethod } from "vite-plugin-mock";

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "权限管理",
    icon: "lock",
    rank: 9,
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限",
        roles: ["admin", "common"],
      },
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "按钮权限",
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
