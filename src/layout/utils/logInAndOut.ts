/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 14:28:54
 * @LastEditTime: 2024-01-30 17:43:29
 * @LastEditors: wangqiaoling
 * @Description: 登入登出的一些方法
 */
import router from "@router";
import { useUserInfo } from "@store/modules/userInfo";
export function logoutSystem() {
  useUserInfo().removeUserInfo();
  router.replace("/login");
}
