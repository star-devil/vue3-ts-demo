/*
 * @Author: wangqiaoling
 * @Date: 2023-11-28 13:23:54
 * @LastEditTime: 2023-12-18 12:28:17
 * @LastEditors: wangqiaoling
 * @Description: 使没有typescript的工具包能够更好的导出
 */
declare module "pinia-plugin-persist" {
  const piniaPluginPersist: any;
  export = piniaPluginPersist;
}
