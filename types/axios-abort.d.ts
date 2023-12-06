/*
 * @Author: wangqiaoling
 * @Date: 2023-11-28 13:23:54
 * @LastEditTime: 2023-12-05 17:25:36
 * @LastEditors: wangqiaoling
 * @Description: 使没有typescript的工具包能够更好的导出
 */
declare module "axios-abort" {
  const withAbort: any;
  export = withAbort;
}
