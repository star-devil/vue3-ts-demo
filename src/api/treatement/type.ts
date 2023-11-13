/*
 * @Author: wangqiaoling
 * @Date: 2023-11-13 10:05:02
 * @LastEditTime: 2023-11-13 10:44:50
 * @LastEditors: wangqiaoling
 * @Description: 诊疗助手接口需要的参数的类型，和接口返回数据的类型
 */

/**
 * @param a a参数注释
 * @param b b参数注释
 * @param c c参数注释
 * @param d d参数注释
 */
export interface requestData {
  a: number;
  b: string;
  c: number;
  d: number;
}

/**
 * @param aa **列表
 * @param bb **列表名称
 */
export interface responseData {
  aa: ContentItem[];
  bb: string;
}
/**
 * @param uuid 唯一标志
 * @param name 名称
 */
interface ContentItem {
  uuid: string;
  name: string;
}
