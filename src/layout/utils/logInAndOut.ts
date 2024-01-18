/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 14:28:54
 * @LastEditTime: 2024-01-18 14:41:05
 * @LastEditors: wangqiaoling
 * @Description: 登入登出的一些方法
 */
import router from "@router";
import { sessionStorage } from "@utils/reStorage";
export function logoutSystem() {
  router.replace("/login");
  sessionStorage.clear();
}
