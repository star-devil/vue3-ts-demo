/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:11:32
 * @LastEditTime: 2024-03-27 13:53:06
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

/** @description EventBus */
export const emitter = mitt();

/** @description 判断是否是纯数组 */
export const isItemArray = (data: any): data is string[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "undefined"
    )
  );
};
/** @description 判断是否是对象数组 */
export const isObjectArray = (data: any) => {
  return Array.isArray(data) && data.every((item) => typeof item === "object");
};
