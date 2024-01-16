/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:11:32
 * @LastEditTime: 2024-01-15 16:07:19
 * @LastEditors: wangqiaoling
 * @Description: 提供一些配置方法
 */

import { isEmpty } from "lodash";
import mitt from "mitt";

/**
 * @description 获取悬浮节点
 * */
export function getContainer(triggerNode: HTMLElement) {
  return triggerNode;
}
/**
 * @description 获取assets静态资源路径，在使用动态路径时很有用
 * */
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
/**
 * @description 判断vue是否为空，在isEmpty的基础上修改，增加对number的过滤
 */
export const isAllEmpty = (value: any) => {
  if (typeof value === "number") return false;
  else return isEmpty(value);
};
/** EventBus */
export const emitter = mitt();
