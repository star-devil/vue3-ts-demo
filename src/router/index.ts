/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:45:50
 * @LastEditTime: 2023-12-13 15:00:31
 * @LastEditors: wangqiaoling
 * @Description: 简单路由配置
 */
import { createRouter, createWebHistory } from "vue-router";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});
/** 原始静态路由（未做任何处理） */
const routes: any[] = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 导出
export default router;
