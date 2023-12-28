/*
 * @Author: wangqiaoling
 * @Date: 2023-12-28 15:57:35
 * @LastEditTime: 2023-12-28 17:33:52
 * @LastEditors: wangqiaoling
 * @Description: 界面配置，包括灰色模式、色弱模式等
 */
import { useThemeStore } from "@store/modules/setting";

/** 配置表 */
const settings = reactive({
  greyVal: useThemeStore().grey,
  weakVal: useThemeStore().weak,
});

/** 添加全局类名 */
function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "").trim();
  targetEl.className = flag ? `${className} ${clsName}` : className;
}

export const useViewsChange = () => {
  /** 设置灰色模式 */
  const greyChange = (value: any): void => {
    toggleClass(
      settings.greyVal,
      "html-grey",
      document.querySelector("html") as HTMLElement
    );
    useThemeStore().setGreyMode(value);
  };
  /** 色弱模式设置 */
  const weakChange = (value: any): void => {
    toggleClass(
      settings.weakVal,
      "html-weakness",
      document.querySelector("html") as HTMLElement
    );
    useThemeStore().setWeakMode(value);
  };
  return {
    greyChange,
    weakChange,
    settings,
  };
};
