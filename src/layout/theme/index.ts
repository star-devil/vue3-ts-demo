/*
 * @Author: wangqiaoling
 * @Date: 2023-12-14 10:26:42
 * @LastEditTime: 2023-12-27 16:41:47
 * @LastEditors: wangqiaoling
 * @Description: 主题色配置文件
 */
type color = {
  colorPrimary: string;
  colorPrimaryBg?: string;
  colorInfo?: string;
  colorSuccess?: string;
  colorBgLayout?: string;
  colorPrimaryBorder?: string;
  colorPrimaryHover?: string;
  colorInfoHover?: string;
  wireframe: boolean;
};
export type ThemeColors = {
  black: color;
  darkAlgorithmblack: color;
  purple: color;
  darkAlgorithmpurple: color;
  green: color;
  darkAlgorithmgreen: color;
  blue: color;
  darkAlgorithmblue: color;
};
/** 预设主题色 */
export const themeColors: ThemeColors = {
  black: {
    colorPrimary: "#1c1c1c",
    colorPrimaryBg: "#E5ECF6",
    colorInfo: "#1886fe",
    colorSuccess: "#34c759",
    colorBgLayout: "#fff",
    wireframe: false,
  },
  darkAlgorithmblack: {
    colorPrimary: "#c6c7f8",
    colorInfo: "#95a4fc",
    colorPrimaryBorder: "#6b6fa5",
    colorPrimaryHover: "#b9b9d4",
    colorBgLayout: "#141414",
    wireframe: false,
  },
  purple: {
    colorInfo: "#af52de",
    colorSuccess: "#34c759",
    wireframe: false,
    colorPrimary: "#af52de",
    colorInfoHover: "#ab6dca",
    colorBgLayout: "#fff",
  },
  darkAlgorithmpurple: {
    colorInfo: "#af52de",
    colorSuccess: "#34c759",
    wireframe: false,
    colorPrimary: "#af52de",
    colorInfoHover: "#ab6dca",
    colorBgLayout: "#141414",
  },
  green: {
    colorPrimary: "#57b329",
    colorInfo: "#1b862c",
    colorInfoHover: "#3db952",
    wireframe: false,
    colorBgLayout: "#fff",
  },
  darkAlgorithmgreen: {
    colorPrimary: "#57b329",
    colorInfo: "#1b862c",
    colorInfoHover: "#3db952",
    wireframe: false,
    colorBgLayout: "#141414",
  },
  blue: {
    colorPrimary: "#1677ff",
    colorInfo: "#1668dc",
    wireframe: false,
    colorBgLayout: "#fff",
  },
  darkAlgorithmblue: {
    colorPrimary: "#1677ff",
    colorInfo: "#1668dc",
    wireframe: false,
    colorBgLayout: "#141414",
  },
};
