/*
 * @Description: 登入登出的一些方法
 */
import { useUserInfo } from "@store/modules/userInfo";
export function logoutSystem() {
  useUserInfo().userLogOut();
}
