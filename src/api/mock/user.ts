import { http } from "@api/axios";

export type UserResult = {
  message: string;
  data: {
    /** 用户名 */
    username: string;
    /** 用户帐号 */
    usercount: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
  code: number;
};

export type RefreshTokenResult = {
  message: string;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
  code: number;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.post<UserResult>("/login", data);
};

export const refreshTokenApi = (data?: object) => {
  return http.post<RefreshTokenResult>("/refreshToken", data);
};
