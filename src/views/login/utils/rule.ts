/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 15:27:54
 * @LastEditTime: 2024-01-18 16:04:18
 * @LastEditors: wangqiaoling
 * @Description: 登录校验
 */
import type { Rule } from "ant-design-vue/es/form";

/** 3-20位账号正则 */
export const REGEXP_NAME = /^.{3,20}$/;
/** 密码正则 */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

const validateName = async (_rule: Rule, value: string) => {
  if (value.trim() === "") {
    return Promise.reject("请输入账号");
  } else if (!REGEXP_NAME.test(value.trim())) {
    return Promise.reject("账号格式有误");
  } else {
    return Promise.resolve();
  }
};

const validatePass = async (_rule: Rule, value: string) => {
  if (value.trim() === "") {
    return Promise.reject("请输入密码");
  } else if (!REGEXP_PWD.test(value.trim())) {
    return Promise.reject("密码格式有误");
  } else {
    return Promise.resolve();
  }
};

const validateCode = async (_rule: Rule, value: string) => {
  if (value.trim() === "") {
    return Promise.reject("请输入验证码");
  } else if (value.trim() !== "3738") {
    return Promise.reject("请输入正确的验证码");
  } else {
    return Promise.resolve();
  }
};

export const loginRules: Record<string, Rule[]> = {
  username: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  vertifyCode: [
    {
      validator: validateCode,
      trigger: "blur",
    },
  ],
};
