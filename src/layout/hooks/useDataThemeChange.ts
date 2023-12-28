/*
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:50:31
 * @LastEditTime: 2023-12-28 14:11:33
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
  /** 明亮和黑暗模式对应的不同主题色数据数组 */
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
  /** 当前选中主题色index, 因为黑暗模式下的主题色名称不同，只有index相同 */
  const currentColorIndex = ref<number>(-1);
  /** 当前选中主题色string */
  const currentColor = ref<string>("");
  /** 设置主题色 */
  const setThemeColor = (colorName: string, index: number) => {
    currentColorIndex.value = index;
    currentColor.value = colorName;
    themeStore.setThemeColor(colorName);
  };

  /** 日间、夜间模式切换 */
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
    currentColor,
    currentColorIndex,
    setThemeColor,
    isLight,
  };
}
