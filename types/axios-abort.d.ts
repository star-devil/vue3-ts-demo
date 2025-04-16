/*
 * @Description: 使没有typescript的工具包能够更好的导出
 */
declare module "axios-abort" {
  const withAbort: any;
  export = withAbort;
}
