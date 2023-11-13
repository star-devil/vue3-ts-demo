/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:13:49
 * @LastEditors: wangqiaoling
 * @LastEditTime: 2023-11-13 10:44:48
 * @Description: 配置封装axios 请求
 */
import { message as Message } from "ant-design-vue"; // 框架的message提示
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

/* 服务器返回数据的的类型，目前用到的接口是这些格式 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

// 公共的错误处理方法
const err = (error: AxiosError) => {
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
    //     message = "服务器故障";
    //     break;
    //   default:
    //     message = "网络连接故障";
    // }
    // Message.error(message);
    // 否则：（这个项目没有确定，就不具体处理了）
    Message.error("接口响应失败，请联系管理员");
  } else if (String(error).indexOf("timeout") > -1) {
    Message.warning("网络不稳定，响应超时，请稍后再试。");
  }
  // console.log('error-', error)
  return Promise.reject(error);
};

const instance: AxiosInstance = axios.create({
  baseURL: "/proxy-api",
  timeout: 2000 * 60,
  headers: { "Content-Type": "application/json" },
});

// 跨域请求，允许保存cookie
instance.defaults.withCredentials = true;

// 1. 新版axios类型AxiosRequestConfig不能赋值给InternalAxiosReqe；
// 2. CreateAxiosDefaults不能赋值给AxiosRequestConfig

// 1: request的最新类型为InternalAxiosRequestConfig
// InternalAxiosRequestConfig又继承于AxiosRequestConfig。

// 2: 原来的类型AxiosRequestConfig已变成了CreateAxiosDefaults。
//    但CreateAxiosDefaults又继承了AxiosRequestConfig。
// 以上两种继承，父类的作用范围是小于子类的
// 所以，在使用拦截器时，使用InternalAxiosRequestConfig而不使用AxiosRequestConfig
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = "Bearer Token";
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
}, err);

instance.interceptors.response.use((response: AxiosResponse) => {
  const { code, msg, data } = response.data;
  if (code) {
    if (code !== 200) {
      if (code === 500) {
        Message.error(`服务请求出错: ${msg}`);
      }
      // TODO: 因为目前不确定接口code规则，暂时不对其他code做处理
      else {
        msg && Message.warning(`${msg}`);
      }
      return Promise.reject(msg);
    } else {
      // 正常返回数据
      return data;
    }
  } else {
    if (response.status === 200) {
      // console.log('response',response)
      return response.data;
    } else {
      Message.warning("服务无法响应，请检查网络或联系管理员");
      return Promise.reject(response);
    }
  }
}, err);

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return instance.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return instance.put(url, data, config);
  },

  delete<T = any>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return instance.delete(url, config);
  },
};
