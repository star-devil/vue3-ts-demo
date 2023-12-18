/*
 * @Author: wangqiaoling
 * @Date: 2023-12-14 10:26:42
 * @LastEditTime: 2023-12-18 17:13:29
 * @LastEditors: wangqiaoling
 * @Description: 主题色配置文件
 */
import { storage } from "@utils/reStorage";
import { theme } from "ant-design-vue";

const { themeType } = storage.get("themes");
const isLight = themeType === "light";

/** 预设主题色 */
export const themeColors = {
  black: {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1c1c1c",
      colorPrimaryBg: "#E5ECF6",
      colorInfo: "#1886fe",
      colorSuccess: "#34c759",
      colorBgLayout: "#fff",
      wireframe: false,
    },
  },
  darkAlgorithmBlack: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: "#c6c7f8",
      colorInfo: "#95a4fc",
      colorPrimaryBorder: "#6b6fa5",
      colorPrimaryHover: "#b9b9d4",
      colorBgLayout: "#141414",
    },
  },
  purple: {
    algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorInfo: "#af52de",
      colorSuccess: "#34c759",
      wireframe: false,
      colorPrimary: "#af52de",
      colorInfoHover: "#ab6dca",
      colorBgLayout: "#fff",
    },
  },
  green: {
    algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorPrimary: "#57b329",
      colorInfo: "#1b862c",
      colorInfoHover: "#3db952",
      wireframe: false,
      colorBgLayout: "#fff",
    },
  },
};
