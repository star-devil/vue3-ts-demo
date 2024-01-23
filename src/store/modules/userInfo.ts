/*
 * @Author: wangqiaoling
 * @Date: 2024-01-23 10:42:55
 * @LastEditTime: 2024-01-23 11:00:01
 * @LastEditors: wangqiaoling
 * @Description: 存储用户可用的个人信息
 */
import { storage } from "@utils/reStorage";
import { defineStore } from "pinia";
const userInfoStorage = storage.get("userInfo");
const expireTime = 7 * 24 * 60; // 7天过期
export const useUserInfo = defineStore({
  id: "userInfo",
  state: () => ({
    userName: userInfoStorage?.name,
    userCount: userInfoStorage?.count,
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
    /** 清理用户信息 */
    removeUserInfo() {
      this.userName = "";
      this.userCount = "";
      storage.remove("userInfo");
    },
  },
});
