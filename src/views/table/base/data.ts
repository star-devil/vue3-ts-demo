/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:32:10
 * @LastEditTime: 2024-03-26 10:38:51
 * @LastEditors: wangqiaoling
 * @Description: 基础表格数据
 */
import type { eColumnsType } from "@/components/baseTable/type";
import { useTableSwitch } from "./switch";
export const baseTableData = ref([
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    status: "on",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    status: "on",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "off",
    tags: ["cool", "teacher"],
  },
]);

const { changeSwitch, clickSwitch } = useTableSwitch(baseTableData.value);

export const baseTableColumns: eColumnsType = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    type: "link",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    type: "switch",
    extraProps: {
      uniqKey: "key",
      checkedValue: "on",
      openText: "在线",
      unCheckedValue: "off",
      closeText: "离线",
      disabled: {
        role: "总经理",
      },
      size: "small",
      change: changeSwitch,
      click: clickSwitch,
    },
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    type: "tags",
  },
  {
    title: "Action",
    type: "action",
  },
];
