/*
 * @Author: wangqiaoling
 * @Date: 2024-01-23 10:42:55
 * @LastEditTime: 2024-07-09 09:52:49
 * @LastEditors: wangqiaoling
 * @Description: 存储用户可用的个人信息
 */
import {
  RefreshTokenResult,
  UserResult,
  getLogin,
  refreshTokenApi,
} from "@api/mock/user";
import router from "@router";
import { removeToken, setToken } from "@utils/auth";
import { emitter } from "@utils/provideConfig";
import { sessionStorage, storage } from "@utils/reStorage";
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
      removeToken();
    },
    /** 登出 */
    userLogOut() {
      this.removeUserInfo();
      sessionStorage.clear();
      emitter.all.clear();
      router.replace("/login");
    },
    /** 登入 */
    async loginByUserName(data: object) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then((res) => {
            setToken(res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** 刷新token */
    async handRefreshToken(data: object) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then((res) => {
            setToken(res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** token过期强制退出登录：清空所有缓存 */
    removeAllInfoAndLogOut() {
      storage.clear();
      sessionStorage.clear();
      removeToken();
      emitter.all.clear();
      router.replace("/login");
    },
  },
});
