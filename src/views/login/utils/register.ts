/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 16:21:26
 * @LastEditTime: 2024-01-19 14:21:46
 * @LastEditors: wangqiaoling
 * @Description: 登入系统逻辑
 */
import router from "@router";

// 登录表单
interface FormState {
  username: string;
  password: string;
  remember: boolean;
  vertifyCode: string;
}

export const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
  vertifyCode: "",
});

export const onLogin = (values: any) => {
  if (
    values.username === "admin" &&
    values.password === "admin123" &&
    values.vertifyCode === "3738"
  ) {
    router.replace("/");
  }
};
