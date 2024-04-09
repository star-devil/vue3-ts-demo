/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:32:10
 * @LastEditTime: 2024-04-09 13:56:03
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

// 点击单元格内元素的回调
function goDetail(event: Event, record: any) {
  console.log("click!!!!", event, record);
}

export const baseTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    type: "link",
    extraProps: {
      onClick: goDetail,
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
      disable: [
        {
          age: 42,
        },
      ],
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
    extraProps: {
      actionsType: "link", // link | text | icon | mixin
      actions: [
        {
          text: "邀请",
          disable: [
            {
              name: "John Brown",
            },
            {
              age: 32,
            },
          ],
          hide: [
            {
              status: "off",
            },
          ],
          props: {
            onClick: goDetail,
          },
        },
        {
          text: "详情",
          color: "warn",
          props: {
            onClick: goDetail,
          },
        },
        {
          text: "修改",
          color: "safe", // safe | warn | danger | hex | undefined
          disable: [
            {
              name: "Jim Green",
              age: 42,
            },
          ],
          props: {
            onClick: goDetail,
          },
        },
        {
          text: "删除",
          color: "danger",
          props: {
            onClick: goDetail,
          },
        },
      ],
    },
  },
];
