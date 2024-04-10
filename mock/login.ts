/*
 * @Author: wangqiaoling
 * @Date: 2024-01-24 14:01:26
 * @LastEditTime: 2024-04-10 16:16:09
 * @LastEditors: wangqiaoling
 * @Description: mock登录接口
 */
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      switch (body.username) {
        case "admin":
          if (body.password !== "admin123") {
            return {
              message: "帐号密码错误",
              data: null,
              code: 400,
            };
          }
          if (body.password === "admin123" && body.vertifyCode !== "3738") {
            return {
              message: "验证码错误",
              data: null,
              code: 400,
            };
          } else {
            return {
              message: "ok",
              data: {
                username: "搬砖监工",
                usercount: "admin",
                // 一个用户可能有多个角色
                roles: ["admin"],
                accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
                refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
                expires: "2024/04/20 00:00:00",
              },
              code: 200,
            };
          }
        case "common":
          if (body.password !== "common123") {
            return {
              message: "帐号密码错误",
              data: null,
              code: 400,
            };
          }
          if (body.password === "common123" && body.vertifyCode !== "3738") {
            return {
              message: "验证码错误",
              data: null,
              code: 400,
            };
          } else {
            return {
              message: "ok",
              data: {
                username: "搬砖工人",
                usercount: "common",
                // 一个用户可能有多个角色
                roles: ["common"],
                accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
                refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
                expires: "2024/04/20 00:00:00",
              },
              code: 200,
            };
          }
        default:
          return {
            message: "帐号密码错误",
            data: null,
            code: 400,
          };
      }
    },
  },
] as MockMethod[];
