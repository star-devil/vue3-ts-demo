/*
 * @Author: wangqiaoling
 * @Date: 2024-04-28 11:21:49
 * @LastEditTime: 2024-04-28 13:17:22
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { Recordable } from "vite-plugin-mock";
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules = import.meta.glob("./mock/**/*.ts", { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...(modules as Recordable)[key].default);
});

/**
 * 用于生产环境使用mock. 需要导入全部modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
