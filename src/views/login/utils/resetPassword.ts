/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 16:21:26
 * @LastEditTime: 2024-01-29 10:53:34
 * @LastEditors: wangqiaoling
 * @Description: 注册账号逻辑
 */
import type { Rule } from "ant-design-vue/es/form";
import { validateName, validatePass } from "./rule";

// 登录表单
interface FormState {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 确认密码 */
  repeatPassword: string;
}

export const formState = reactive<FormState>({
  username: "",
  password: "",
  repeatPassword: "",
});

export const repeatPasswordRule = async (_rule: Rule, value: string) => {
  if (value.trim() === "") {
    return Promise.reject("请输入确认密码");
  } else if (formState.password !== value) {
    return Promise.reject("两次密码不一致");
  } else {
    return Promise.resolve();
  }
};

/** 注册校验 */
export const registerRules: Record<string, Rule[]> = {
  username: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  repeatPassword: [
    {
      validator: repeatPasswordRule,
      trigger: "change",
    },
  ],
};
