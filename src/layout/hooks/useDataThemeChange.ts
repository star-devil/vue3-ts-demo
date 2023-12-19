/*
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:50:31
 * @LastEditTime: 2023-12-19 16:47:43
 * @LastEditors: wangqiaoling
 * @Description: 系统主题配置
 */
import { useThemeStore } from "@store/modules/setting";
const themeStore = useThemeStore();
export function useDataThemeChange() {
  /** 设置主题色 */
  const setThemeColor = () => {};

  /** 日间、夜间主题切换 */
  function dataThemeChange() {
    if (themeStore.themeType === "light") {
      themeStore.setThemeType("dark");
    } else {
      themeStore.setThemeType("light");
    }
  }

  return {
    dataThemeChange,
    setThemeColor,
  };
}
