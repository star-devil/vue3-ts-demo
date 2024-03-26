/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:32:10
 * @LastEditTime: 2024-03-26 15:59:38
 * @LastEditors: wangqiaoling
 * @Description: 基础表格数据
 */
import type { eColumnsType } from "@/components/baseTable/type";
import { getTableData } from "@api/mock/table";
import { useTableSwitch } from "./switch";

export const baseTableData = ref([]);
export const tableLoading = ref<boolean>(false);
export function getData() {
  tableLoading.value = true;
  getTableData()
    .then((res) => {
      baseTableData.value = res.data.content;
    })
    .finally(() => {
      tableLoading.value = false;
    });
}

const { changeSwitch, clickSwitch } = useTableSwitch(baseTableData);

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
