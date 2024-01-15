/*
 * @Author: wangqiaoling
 * @Date: 2024-01-15 10:47:58
 * @LastEditTime: 2024-01-15 10:48:01
 * @LastEditors: wangqiaoling
 * @Description: 公共类型
 */
declare namespace ANTD {
  type Route = import("ant-design-vue/lib/breadcriumb/Breadcrumb").Route;
}
//面包屑项类型
interface BreadRoute extends ANTD.Route {
  step?: number;
}
//页面基本信息,使用在页头
interface PAGEINFO {
  name: string;
  ShowBack: boolean;
  backRouter?: string;
  customBackFun?: boolean;
  breadBegins?: Array<ANTD.Route>;
  notShowBread?: boolean;
}
