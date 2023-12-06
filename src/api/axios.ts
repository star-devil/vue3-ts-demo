/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:13:49
 * @LastEditors: wangqiaoling
 * @LastEditTime: 2023-12-06 16:08:05
 * @Description: 配置封装axios 请求
 */
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import withAbort from "axios-abort"; // 取消请求
import axiosRetry from "axios-retry"; // 重试
import { err } from "./httpHandler"; // 公共的错误处理方法

/* 服务器返回数据的的类型，目前用到的接口是这些格式 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

/** 自定义封装axios */
const instance: AxiosInstance = axios.create({
  baseURL: "/proxy-api",
  timeout: 2000 * 60,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});
/** 取消请求的插件 */
withAbort(instance);

/** 跨域请求，允许保存cookie */
instance.defaults.withCredentials = true;

/**
 * @description 当第一次请求超时或者错误码大于500后，最多重试2次
 * @description 其他错误类型也可以设置自动重试，重试延时也可以自定义
 *  */
axiosRetry(instance, {
  retries: 2,
  shouldResetTimeout: true, // 每次重试都重置超时时间
  retryDelay: (retryCount) => {
    return Math.pow(2, retryCount) * 1000; // 使用指数退避策略
  },
  retryCondition: (err) => {
    // true为打开自动发送请求，false为关闭自动发送请求
    const { message, response } = err;
    return (
      (response?.status && response.status > 500) || message.includes("timeout")
    );
  },
});

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
        console.error(`服务请求出错: ${msg}`); // 如果你使用了ui框架，则可以使用全局提示
      }
      // TODO: 因为目前不确定接口code规则，暂时不对其他code做处理
      else {
        // msg && Message.warning(`${msg}`);  // 如果你使用了ui框架，则可以使用全局提示
      }
      return Promise.reject(msg);
    } else {
      // 正常返回数据
      return data;
    }
  } else {
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("服务无法响应，请检查网络或联系管理员"); // 如果你使用了ui框架，则可以使用全局提示
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
