import { MockMethod } from "vite-plugin-mock";

const permissionRouter = {
  path: "/permission",
  meta: {
    icon: "safety",
    title: "权限管理",
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
        roles: ["admin"],
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
        code: 200,
        message: "ok",
        data: [permissionRouter],
      };
    },
  },
] as MockMethod[];
