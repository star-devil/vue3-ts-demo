/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:32:10
 * @LastEditTime: 2024-03-28 18:07:22
 * @LastEditors: wangqiaoling
 * @Description: 基础表格数据
 */
import { TwitterOutlined } from "@ant-design/icons-vue";
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

const { changeSwitch, clickSwitch, switchLoading } =
  useTableSwitch(baseTableData);

function goDetail(event, record) {
  console.log("click!!!!", event, record);
}

export const baseTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    type: "link",
    extraProps: {
      click: goDetail,
    },
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
      checked: "on",
      checkedChildren: "在线",
      unCheckedChildren: "离线",
      disabled: {
        age: 42,
      },
      size: "small",
      loading: switchLoading,
      onChange: changeSwitch,
      onClick: clickSwitch,
    },
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    type: "tags",
    extraProps: {
      colors: [
        {
          value: "nice",
          color: "green",
        },
        {
          value: "cool",
          color: "green",
        },
        {
          value: "developer",
          color: "volcano",
        },
        {
          value: "teacher",
          color: "pink",
        },
      ],
      icons: h(TwitterOutlined),
      closable: true,
      onClose: goDetail,
    },
  },
  {
    title: "Action",
    type: "action",
  },
];
