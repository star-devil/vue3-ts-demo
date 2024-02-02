/*
 * @Author: wangqiaoling
 * @Date: 2023-11-21 14:10:49
 * @LastEditTime: 2024-02-01 15:16:21
 * @LastEditors: wangqiaoling
 * @Description: axios错误处理函数
 */
import NProgress from "@utils/progress";
import type { AxiosError } from "axios";

/** 错误处理 */
export const err = (error: AxiosError) => {
  // 关闭进度条动画
  NProgress.done();
  if (error.response) {
    // 如果接口有对应的HTTP 状态码
    // let message = "";
    // const status = error.response?.status;
    // switch (status) {
    //   case 401:
    //     message = "token 失效，请重新登录";
    //     // 这里可以触发退出的 action
    //     break;
    //   case 403:
    //     message = "拒绝访问";
    //     break;
    //   case 404:
    //     message = "请求地址错误";
    //     break;
    //   case 500:
    //   case 501:
    //   case 502:
    //   case 503:
    //   case 504:
    //     message = "服务器故障";
    //     break;
    //   default:
    //     message = "网络连接故障";
    // }
    // Message.error(message); // 如果你使用了ui库，console可以换成全局提示
    // 否则：（项目没有确定，就不具体处理了）
    console.error("接口响应失败，请联系管理员"); // 如果你使用了ui库，console可以换成全局提示
  } else if (String(error).indexOf("timeout") > -1) {
    console.error("网络不稳定，响应超时，请稍后再试。");
  } else if (String(error).indexOf("canceled") > -1) {
    console.info("服务请求已取消");
  }
  return Promise.reject(error);
};
