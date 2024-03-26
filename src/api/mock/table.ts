/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 11:06:44
 * @LastEditTime: 2024-03-26 11:11:14
 * @LastEditors: wangqiaoling
 * @Description: 模拟获取表格数据
 */
import { http } from "@api/axios";

export type BaseTableData = {
  message: string;
  data: {
    content: Array<any>;
    pageInfo: object;
  };
  code: number;
};
/** 获取表格数据 */
export const getTableData = (data?: object) => {
  return http.post<BaseTableData>("/api/baseTableData", data);
};
/** 更改状态 */
export const changeStatus = (data?: object) => {
  return http.post<BaseTableData>("/api/changeStatus", data);
};
