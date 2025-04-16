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
