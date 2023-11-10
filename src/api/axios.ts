/*
 * @Author: wlh
 * @Date: 2023-08-31 17:29:14
 * @LastEditors: wangqiaoling
 * @LastEditTime: 2023-11-10 17:23:15
 * @FilePath: /src/api/axios.js
 * @Description: 配置封装axios 请求
 */

import { message } from "ant-design-vue";
import axios from "axios";

// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

// 公共的错误处理方法
const err = (error: { response: any }) => {
  if (error.response) {
    message.error("接口响应失败，请联系管理员");
  } else if (String(error).indexOf("timeout") > -1) {
    message.warning("网络不稳定，响应超时，请稍后再试。");
  }
  // console.log('error-', error)
  return Promise.reject(error);
};

const instance = axios.create({
  baseURL: "/proxy-api",
  timeout: 2000 * 60,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer Token";
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
}, err);

instance.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code) {
    if (res.code !== 200) {
      if (res.code === 500) {
        message.error(`服务请求出错: ${res.msg}`);
      }
      // TODO: 因为目前不确定接口code规则，暂时不对其他code做处理
      else {
        res.msg && message.warning(`${res.msg}`);
      }
      return Promise.reject(res.msg);
    } else {
      // 正常返回数据
      return res.data;
    }
  } else {
    if (response.status === 200) {
      // console.log('response',response)
      return response.data;
    } else {
      message.warning("服务无法响应，请检查网络或联系管理员");
      return Promise.reject(response);
    }
  }
}, err);
export default instance;
