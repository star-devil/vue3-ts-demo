/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 14:28:54
 * @LastEditTime: 2024-02-02 10:07:19
 * @LastEditors: wangqiaoling
 * @Description: 登入登出的一些方法
 */
import { useUserInfo } from "@store/modules/userInfo";
export function logoutSystem() {
  useUserInfo().userLogOut();
}
