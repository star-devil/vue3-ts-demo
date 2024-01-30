/*
 * @Author: wangqiaoling
 * @Date: 2024-01-23 10:42:55
 * @LastEditTime: 2024-01-30 14:14:43
 * @LastEditors: wangqiaoling
 * @Description: 存储用户可用的个人信息
 */
import { UserResult, getLogin } from "@api/mock/user";
import { setToken } from "@utils/auth";
import { storage } from "@utils/reStorage";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";
const userInfoStorage = storage.get("userInfo");
const userRolesStorage = storage.get("userRoles");
const expireTime = 7 * 24 * 60; // 7天过期

export const useUserInfo = defineStore({
  id: "userInfo",
  state: () => ({
    userName: userInfoStorage?.name ?? "",
    userCount: userInfoStorage?.count ?? "",
    // 页面级别权限
    roles: userRolesStorage?.roles ?? [],
  }),
  actions: {
    /**
     * 将用户名和用户账号存储下来，以便页面使用
     * @param info 当前登录用户的用户信息
     */
    setUserInfo(info: any) {
      this.userName = info.name;
      this.userCount = info.count;
      storage.set(
        "userInfo",
        {
          name: info.name,
          count: info.count,
        },
        expireTime
      );
    },
    /** 存储角色 */
    setUserRoles(roles: Array<string>) {
      this.roles = roles;
      storage.set(
        "userRoles",
        {
          roles: roles,
        },
        expireTime
      );
    },
    /** 清理用户信息 */
    removeUserInfo() {
      this.userName = "";
      this.userCount = "";
      this.roles = [];
      storage.remove("userInfo");
      storage.remove("userRoles");
    },

    /** 登入 */
    async loginByUserName(data: object) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then((res) => {
            message.success("登录成功");
            setToken(res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
