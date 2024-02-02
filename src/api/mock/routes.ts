/*
 * @Author: wangqiaoling
 * @Date: 2024-02-02 14:14:05
 * @LastEditTime: 2024-02-02 14:14:50
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { http } from "@api/axios";

type Result = {
  message: string;
  data: Array<any>;
  code: number;
};

export const getAsyncRoutes = () => {
  return http.get<Result>("/getAsyncRoutes");
};
