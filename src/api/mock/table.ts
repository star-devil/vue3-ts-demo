import { http } from "@api/request/axios";

export type BaseTableData = {
  message: string;
  data: {
    content: Array<any>;
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
    };
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
