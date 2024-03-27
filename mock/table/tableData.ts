import { MockMethod } from "vite-plugin-mock";

export const baseTableData = [
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
    tags: ["cool", "teacher", "nice"],
  },
];

export default [
  {
    url: "/api/baseTableData",
    method: "post",
    response: () => {
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
    },
  },
] as MockMethod[];
