/*
 * @Author: wangqiaoling
 * @Date: 2024-01-29 10:30:02
 * @LastEditTime: 2024-01-29 14:49:36
 * @LastEditors: wangqiaoling
 * @Description:: 封装存储cookies的方法，在不支持storage的环境或者其他需求情况下使用
 */
import { assign } from "lodash";

type CookieOptions = {
  /** 只发送Cookie到指定路径。默认是整个域名。 */
  path?: string;
  /** 指定可以访问Cookie的域名，默认是发送请求的当前域名。 */
  domain?: string;
  /** 如果设为true，则只在HTTPS连接下传输Cookie。 */
  secure?: boolean;
  /** 如果设为strict，则在跨站点请求中不发送Cookie。如果设为lax，则在跨站GET请求中不发送Cookie。 */
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
  /** Cookie过期日期。可以是一个数字，表示该Cookie的生命周期（以秒为单位），或者可以是一个Date对象，表示Cookie的过期日期
   * 设置为-1，可以用作删除cookie
   */
  expires?: string | number | Date;
};

export const Cookies = {
  set(name: string, value: string, options?: CookieOptions) {
    const defaultOptions = {
      path: "/",
      secure: true,
      sameSite: "strict",
      expires: 7 * 24 * 60 * 60,
    };
    options = assign(defaultOptions, options);
    let expires = options.expires;
    if (typeof expires == "number" && expires) {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    } else if (expires && (expires as Date).toUTCString()) {
      options.expires = (expires as Date).toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = `${name}=${value}`;

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
  },
  get(name: string): string | null {
    const cookieStr = document.cookie;
    const cookies = cookieStr.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  },
  delete(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};
