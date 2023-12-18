/*
 * @Author: wangqiaoling
 * @Date: 2023-12-18 12:30:17
 * @LastEditTime: 2023-12-18 17:09:15
 * @LastEditors: wangqiaoling
 * @Description: 封装操作本地存储的方法
 */

import { objectDecrypt, objectEncrypt } from "./crypt";

/**
 * prefix: storage名称前缀
 * data: 存储的内容
 * time: 存储数据时的时间
 * expire: 数据过期时间，单位分钟
 * isEncrypt: 是否加密
 */
interface Storage {
  data: any;
  time: number;
  expire: number;
}
const prefix = import.meta.env.VITE_SYS_PREFIX; // storage名称前缀,由环境变量决定
const mode = import.meta.env.MODE === "test" || import.meta.env.MODE === "pro"; // 非开发环境缓存加密

/**
 * @description 封装操作localstorage本地存储的方法
 */
export const storage = {
  //存储
  set(key: string, value: any, expire: number) {
    const obj: Storage = {
      data: value,
      time: Date.now(),
      expire: expire * 60, // 把秒转为分钟
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(
      `${prefix}-${key}`,
      mode ? objectEncrypt(obj) : JSON.stringify(obj)
    );
  },
  //取出数据
  get(key: string) {
    const name = `${prefix}-${key}`;
    const value = localStorage.getItem(name);
    if (!value) {
      return value;
    } else if (value != "undefined" && value != "null") {
      const parseValue: Storage = mode
        ? objectDecrypt(value)
        : JSON.parse(value);
      if (parseValue && Date.now() - parseValue.time > parseValue.expire) {
        localStorage.removeItem(name);
        return null;
      }

      return parseValue.data;
    }
  },
  // 删除数据
  remove(key: string) {
    const name = `${prefix}-${key}`;
    localStorage.removeItem(name);
  },
  // 清空
  clear() {
    localStorage.clear();
  },
};

/**
 * @description 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  //存储
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  },
  // 删除数据
  remove(key: string) {
    window.sessionStorage.removeItem(key);
  },
  // 清空
  clear() {
    window.sessionStorage.clear();
  },
};
