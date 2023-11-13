/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 15:51:22
 * @LastEditTime: 2023-11-13 11:11:48
 * @LastEditors: wangqiaoling
 * @Description: 某个api
 */
import { http } from "@api/axios";
import { requestData, responseData } from "./type";

export const getknowledgeList = (data: requestData) => {
  const url = `/***?data=${data}`;
  return http.get<responseData[]>(url);
};
