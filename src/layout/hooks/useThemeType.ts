/*
 * @Author: wangqiaoling
 * @Date: 2023-12-29 10:26:31
 * @LastEditTime: 2023-12-29 10:27:53
 * @LastEditors: wangqiaoling
 * @Description: 日间、夜间模式切换
 */
import { useThemeStore } from "@store/modules/setting";

const themeStore = useThemeStore();

export function useThemeType() {
  /** 是否为日间模式 */
  const isLight = ref<boolean>(themeStore.themeType === "light");
  /** 日间、夜间模式切换 */
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
    isLight,
  };
}
