/*
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:07:03
 * @LastEditTime: 2024-03-27 09:48:18
 * @LastEditors: wangqiaoling
 * @Description: 表格扩展type
 */
import {
  ColumnGroupType,
  ColumnType,
  TableProps,
} from "ant-design-vue/es/table";

//为ColumnType 添加扩展
export interface eColumnType<RecordType> extends ColumnType<RecordType> {
  type?: string;
  extraProps?: object;
}

export type eColumnsType<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | eColumnType<RecordType>
)[];

//扩展 TableProps
export interface eTableProps<RecordType> extends TableProps<RecordType> {
  columns?: eColumnsType<RecordType>;
}

/** 表示多个标签，特定值显示指定颜色：
 *  对象格式：{value: 字段值,color: 显示颜色}
 *  注意⚠️：字段值只支持字符串/数字/undefined/null类型
 *  */
export type ComplexColor = {
  value: string | number | undefined | null;
  color: string;
};
