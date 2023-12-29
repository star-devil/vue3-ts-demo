/*
 * @Author: wangqiaoling
 * @Date: 2023-11-21 09:18:32
 * @LastEditTime: 2023-12-29 16:30:05
 * @LastEditors: wangqiaoling
 * @Description: 增加环境变量的智能提示
 */
interface ImportMetaEnv {
  readonly VITE_DROP_CONSOLE: boolean; //去除console 数据是只读的无法被修改
  readonly VITE_SYS_PREFIX: string; // 是否需要显示应用头
  readonly VITE_SHOW_SET: boolean; // 是否需要显示系统配置
  readonly VITE_IS_GREY: boolean; // 是否开启灰色模式
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, any>;
  export default component;
}
