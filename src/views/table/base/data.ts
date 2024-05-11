/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:32:10
 * @LastEditTime: 2024-05-11 10:47:53
 * @LastEditors: wangqiaoling
 * @Description: 基础表格数据
 */
import {
  ContactsOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  TwitterOutlined,
} from "@ant-design/icons-vue";
import { getTableData } from "@api/mock/table";
import { useTableSwitch } from "./switch";

export const baseTableData = ref([]);
export const tableLoading = ref<boolean>(false);
export const searchParams = reactive({
  page: 0,
  size: 5,
});
export const paginationInfo = reactive({
  pageSize: 5,
  pageSizeOptions: ["5", "10", "20", "50"],
  total: 0,
  change: (page: number, pageSize: number) => {
    searchParams.page = page - 1;
    searchParams.size = pageSize;
    getData();
  },
});
export function getData() {
  tableLoading.value = true;
  getTableData(searchParams)
    .then((res) => {
      baseTableData.value = res.data.content;
      paginationInfo.total = res.data.pageInfo.totalElements;
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

function clickTest(event: Event, record: any) {
  console.log("clickTest!!!!", event, record);
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
    type: "badge",
    extraProps: {
      color: "pink", // color和processing同时存在，可以改变processing的颜色，保留动效
      status: "processing",
      colors: [
        {
          value: 22,
          color: "pink",
        },
        {
          value: 32,
          // color: "cyan",
          status: "processing",
        },
        {
          value: 42,
          status: "success",
        },
      ],
    },
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    type: "paragraph",
    width: 300,
    extraProps: {
      ellipsis: {
        maxLines: 2,
        expandable: true,
      },
    },
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
            icon: h(HeartOutlined),
            onClick: clickTest,
          },
        },
        {
          text: "详情",
          color: "warning",
          props: {
            icon: h(ContactsOutlined),
            onClick: clickTest,
          },
        },
        {
          text: "修改",
          color: "success", // success | warning | danger | hex | undefined
          disable: [
            {
              name: "Jim Green",
              age: 42,
            },
          ],
          props: {
            icon: h(EditOutlined),
            onClick: clickTest,
          },
        },
        {
          text: "删除",
          color: "danger",
          popConfirm: {
            title: "确定要删除吗？",
            okText: "删除",
            cancelText: "取消",
            onConfirm: clickTest,
          },
          props: {
            icon: h(DeleteOutlined),
          },
        },
      ],
    },
  },
];
