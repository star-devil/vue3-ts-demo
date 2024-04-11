/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:58:31
 * @LastEditTime: 2024-04-11 13:31:06
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { MockMethod } from "vite-plugin-mock";

export const baseTableData = [
  {
    key: "1",
    name: "John Brown",
    age: 22,
    address: "New York No. 1 Lake Park",
    status: "on",
    tags: ["nice", "developer"],
    description:
      "AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。 我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    status: "on",
    tags: ["loser"],
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "off",
    tags: ["cool", "teacher", "nice"],
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
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
