/*
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:50:31
 * @LastEditTime: 2023-12-20 10:04:26
 * @LastEditors: wangqiaoling
 * @Description: 系统主题配置
 */
import { useThemeStore } from "@store/modules/setting";
const themeStore = useThemeStore();
export function useDataThemeChange() {
  /** 设置主题色 */
  const setThemeColor = () => {};

  /** 日间、夜间主题切换 */
  const isLight = ref<boolean>(themeStore.themeType === "light");
  function dataThemeChange() {
    if (themeStore.themeType === "light") {
      themeStore.setThemeType("dark");
      isLight.value = false;
    } else {
      themeStore.setThemeType("light");
      isLight.value = true;
    }
  }

  return {
    dataThemeChange,
    setThemeColor,
    isLight,
  };
}
