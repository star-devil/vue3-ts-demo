/*
 * @Author: wangqiaoling
 * @Date: 2023-11-28 13:23:54
 * @LastEditTime: 2024-07-26 15:21:48
 * @LastEditors: wangqiaoling
 * @Description: 使没有typescript的工具包能够更好的导出
 */
declare module "vue-simple-uploader" {
  const uploader: any;
  export = uploader;
}
