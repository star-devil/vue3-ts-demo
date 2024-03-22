/*
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:07:03
 * @LastEditTime: 2024-03-22 14:13:44
 * @LastEditors: wangqiaoling
 * @Description: 表格扩展type
 */
import {
  ColumnGroupType,
  ColumnType,
  TableProps,
} from "ant-design-vue/es/table";
import { renderKey } from "./renderComponents";

//为ColumnType 添加扩展
export interface eColumnType<RecordType> extends ColumnType<RecordType> {
  type?: renderKey;
}

export type eColumnsType<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | eColumnType<RecordType>
)[];

//扩展 TableProps
export interface eTableProps<RecordType> extends TableProps<RecordType> {
  columns?: eColumnsType<RecordType>;
}
