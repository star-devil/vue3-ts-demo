/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DROP_CONSOLE: string; //去除console 数据是只读的无法被修改
  readonly VITE_SYS_PREFIX: string; // 是否需要显示应用头
  readonly VITE_SHOW_SET: string; // 是否需要显示系统配置
  readonly VITE_IS_GREY: string; // 是否开启灰色模式
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, any>;
  export default component;
}
