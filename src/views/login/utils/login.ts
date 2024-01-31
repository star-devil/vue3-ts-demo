/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 16:21:26
 * @LastEditTime: 2024-01-30 16:19:17
 * @LastEditors: wangqiaoling
 * @Description: 登入系统逻辑
 */
import router from "@router";
import { useUserInfo } from "@store/modules/userInfo";
import { getGreeting } from "@utils/greeting";
import { notification } from "ant-design-vue";

// 登录表单
interface FormState {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 记住帐号 */
  remember: boolean;
  /** 验证码 */
  vertifyCode: string;
}

export const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
  vertifyCode: "",
});

export const loginLoading = ref<boolean>(false);

function showNotification(username: string) {
  notification.success({
    message: "欢迎登录",
    description: `${username}，${getGreeting()}`,
    placement: "topRight",
  });
}

export const onLogin = (values: any) => {
  loginLoading.value = true;
  if (!values) return;
  useUserInfo()
    .loginByUserName(values)
    .then((res) => {
      router.replace("/");
      useUserInfo().setUserInfo({
        name: res.data.username,
        count: res.data.usercount,
      });
      showNotification(res.data.username);
    })
    .catch(() => {
      useUserInfo().removeUserInfo();
    })
    .finally(() => {
      loginLoading.value = false;
    });
};
