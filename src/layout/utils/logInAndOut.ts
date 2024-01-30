/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 14:28:54
 * @LastEditTime: 2024-01-30 10:31:21
 * @LastEditors: wangqiaoling
 * @Description: 登入登出的一些方法
 */
import router from "@router";
import { sessionStorage, storage } from "@utils/reStorage";
export function logoutSystem() {
  sessionStorage.clear();
  storage.clear();
  router.replace("/login");
}
