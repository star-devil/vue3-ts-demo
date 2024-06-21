/*
 * @Author: wangqiaoling
 * @Date: 2024-04-28 11:21:49
 * @LastEditTime: 2024-05-21 16:19:57
 * @LastEditors: wangqiaoling
 * @Description:  生产环境使用演示数据, 使用此数据浏览器将无实质HTTP请求
 */
import { Recordable } from "vite-plugin-mock";
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules: Record<string, any> = import.meta.glob("./*.ts", {
  eager: true,
});

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_mockProdServer")) return;
  mockModules.push(...(modules as Recordable)[key].default);
});

/**
 * 用于生产环境使用mock. 需要导入全部modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
