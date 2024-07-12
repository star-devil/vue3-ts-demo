/*
 * @Author: wangqiaoling
 * @Date: 2023-11-28 13:23:54
 * @LastEditTime: 2024-07-12 09:44:30
 * @LastEditors: wangqiaoling
 * @Description: 使没有typescript的工具包能够更好的导出
 */
declare module "jsonlint-mod" {
  const jsonlint: any;
  export = jsonlint;
}
