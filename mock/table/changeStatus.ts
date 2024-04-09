/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:56:06
 * @LastEditTime: 2024-04-09 14:00:29
 * @LastEditors: wangqiaoling
 * @Description:
 */
import pkg from "lodash";
import { MockMethod } from "vite-plugin-mock";
import { baseTableData } from "./tableData";
const { find } = pkg;

export default [
  {
    url: "/api/changeStatus",
    method: "post",
    response: ({ body }) => {
      const changeItem = find(baseTableData, (n) => n.key === body.id);
      if (changeItem) {
        changeItem.status = body.isOnline ? "on" : "off";
        return {
          code: 200,
          message: "操作成功",
          data: {
            content: baseTableData,
            pageInfo: {
              page: 0,
              size: 10,
              totalElements: baseTableData.length,
            },
          },
        };
      } else {
        return {
          code: 500,
          message: "操作失败",
          data: null,
        };
      }
    },
  },
] as MockMethod[];
