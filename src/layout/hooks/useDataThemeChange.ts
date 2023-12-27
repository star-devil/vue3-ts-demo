/*
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:50:31
 * @LastEditTime: 2023-12-26 18:12:50
 * @LastEditors: wangqiaoling
 * @Description: 系统主题配置
 */
import { useThemeStore } from "@store/modules/setting";
import { forIn } from "lodash";
import { themeColors } from "../theme/index";

interface colorList {
  name: string;
  color: string;
}

const themeStore = useThemeStore();
export function useDataThemeChange() {
  /** 设置主题色 */
  const getThemesColors = () => {
    const darkThemesColorsList: colorList[] = [];
    const lightThemesColorsList: colorList[] = [];
    forIn(themeColors, function (value, key) {
      if (key.indexOf("dark") > -1) {
        darkThemesColorsList.push({
          name: key,
          color: value.colorPrimary,
        });
      } else {
        lightThemesColorsList.push({
          name: key,
          color: value.colorPrimary,
        });
      }
    });
    return {
      darkThemesColorsList,
      lightThemesColorsList,
    };
  };
  const setThemeColor = (colorName: string) => {
    themeStore.setThemeColor(colorName);
  };

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
    getThemesColors,
    dataThemeChange,
    setThemeColor,
    isLight,
  };
}
