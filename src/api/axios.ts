/* eslint-disable indent */
/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:13:49
 * @LastEditors: wangqiaoling
 * @LastEditTime: 2024-02-02 10:59:40
 * @Description: 配置封装axios 请求
 */
import { useUserInfo } from "@store/modules/userInfo";
import { formatToken, getToken } from "@utils/auth";
import NProgress from "@utils/progress";
import { message as Message } from "ant-design-vue";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CustomParamsSerializer,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import withAbort from "axios-abort"; // 取消请求
import axiosRetry from "axios-retry"; // 重试
import { stringify } from "qs"; // 序列化
import { err } from "./httpHandler"; // 公共的错误处理方法

/* 服务器返回数据的的类型，目前用到的接口是这些格式 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
/** axio自定义配置 */
const defaultConfig: AxiosRequestConfig = {
  // baseURL: "/proxy-api",
  timeout: 2000 * 60,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};

/** 自定义封装axios */
const instance: AxiosInstance = axios.create(defaultConfig);
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

/** 防止重复刷新token */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isRefreshing = false;

// 原始请求队列
let requests: any = [];
/**
 * 原有的请求队列，在重新获取完 Access Token 后继续执行之前未完成的请求
 * 适用于同时多个请求的情况
 *  */
function retryOriginalRequest(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  return new Promise((resolve) => {
    requests.push((token: string) => {
      config.headers["Authorization"] = formatToken(token);
      resolve(config);
    });
  });
}

// 1. 新版axios类型AxiosRequestConfig不能赋值给InternalAxiosReqe；
// 2. CreateAxiosDefaults不能赋值给AxiosRequestConfig

// 1: request的最新类型为InternalAxiosRequestConfig
// InternalAxiosRequestConfig又继承于AxiosRequestConfig。

// 2: 原来的类型AxiosRequestConfig已变成了CreateAxiosDefaults。
//    但CreateAxiosDefaults又继承了AxiosRequestConfig。
// 以上两种继承，父类的作用范围是小于子类的
// 所以，在使用拦截器时，使用InternalAxiosRequestConfig而不使用AxiosRequestConfig
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 开启进度条动画
  NProgress.start();
  /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
  const whiteList = ["/refreshToken", "/login"];
  return whiteList.some((v) => config.url.indexOf(v) > -1)
    ? config
    : new Promise((resolve) => {
        const data = getToken();
        if (data) {
          const now = new Date().getTime();
          // TODO: 这里应该还有一个判断refreshToken是否过期的逻辑，需要结合服务端的设计进行编码，此处省略
          // TODO: 当refreshToken过期之后，应该清除所有记录并回到登录页
          // 由前端根据返回的expires判断accessToken是否过期，这个过期也可以由服务端判断，前端根据返回的code处理即可
          const expired = data.expires - now <= 0;
          if (expired) {
            if (!isRefreshing) {
              isRefreshing = true;
              // token过期刷新
              useUserInfo()
                .handRefreshToken({ refreshToken: data.refreshToken })
                .then((res) => {
                  const token = res.data.accessToken;
                  config.headers["Authorization"] = formatToken(token);
                  requests.forEach((cb: any) => cb(token));
                  // 执行完成后，清空队列
                  requests = [];
                })
                .catch(() => {
                  Message.error("登录过期, 请重新登录");
                  useUserInfo().removeAllInfoAndLogOut();
                  return config;
                })
                .finally(() => {
                  isRefreshing = false;
                });
            }
            resolve(retryOriginalRequest(config));
          } else {
            config.headers["Authorization"] = formatToken(data.accessToken);
            resolve(config);
          }
        } else {
          resolve(config);
        }
      });
}, err);

instance.interceptors.response.use((response: AxiosResponse) => {
  // 关闭进度条动画
  NProgress.done();
  const { code, message } = response.data;
  if (code) {
    if (code !== 200) {
      if (code === 500) {
        Message.error(`服务请求出错: ${message}`);
      }
      // TODO: 因为目前不确定接口code规则，暂时不对其他code做处理
      else if (code === 400) {
        Message.warning(`${message}`);
      } else {
        Message.warning(`${message}`);
      }
      return Promise.reject(message);
    } else {
      // 正常返回数据
      return response.data;
    }
  } else {
    if (response.status === 200) {
      return response.data;
    } else {
      Message.error("服务无法响应，请检查网络或联系管理员");
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
