/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:11:32
 * @LastEditTime: 2024-08-06 09:46:26
 * @LastEditors: wangqiaoling
 * @Description: 提供一些配置方法
 */

import { cloneDeep, forIn, isEmpty } from "lodash";
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

/**
 * @description 用于处理v-bind绑定对象时无法对方法传递参数的问题
 * @param originProps 原始props
 * @param extraCallbackData 需要传递给回调函数的额外参数
 * @returns 附带了额外参数的props
 */
export function covertFunction(originProps: any, extraCallbackData: any) {
  const newProps = cloneDeep(originProps);
  forIn(newProps, (value: any, key: string) => {
    if (typeof value === "function") {
      newProps[key] = ($event: any) => value($event, extraCallbackData);
    }
  });
  return newProps;
}

/**
 * @description 可用于动态控制操作是否禁用(or是否隐藏or是否渲染，凡是可以用true/false判断的都使用这个方法)
 * @param disable 用于判断禁用的对象参数，数组内各item之间是或关系，item内部属性是与关系
 * @param targetData 目标数据，如果与item内部属性值相同则禁用，与或判断参看disable
 * @returns boolean
 */
export function actionIsDisabled(
  disable: { [key: string]: any }[],
  targetData: { [key: string]: any }
) {
  if (!disable || disable.length === 0) return false;
  for (const condition of disable) {
    let disableAction = true;
    forIn(condition, (value, key) => {
      if (targetData[key] !== value) {
        disableAction = false;
        return;
      }
    });
    if (disableAction) return true;
  }
  return false;
}

/**
 * @description 格式化字节数
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的字节数
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
