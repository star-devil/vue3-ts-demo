/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:11:32
 * @LastEditTime: 2023-12-06 16:09:45
 * @LastEditors: wangqiaoling
 * @Description: 提供一些配置方法
 */
// 全局配置
export function getContainer(triggerNode: HTMLElement) {
  return triggerNode;
}
// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
