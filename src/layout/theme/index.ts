/*
 * @Author: wangqiaoling
 * @Date: 2023-12-14 10:26:42
 * @LastEditTime: 2024-01-10 17:04:17
 * @LastEditors: wangqiaoling
 * @Description: 主题色配置文件
 */
type color = {
  colorPrimary: string;
  colorPrimaryBg?: string;
  colorPrimaryActive?: string;
  colorInfo?: string;
  colorInfoText?: string;
  colorPrimaryTextActive?: string;
  colorSuccess?: string;
  colorBgLayout?: string;
  colorPrimaryLight?: string;
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
    colorPrimaryBg: "#95A4FC",
    colorPrimaryLight: "#F7F9FB",
    colorInfo: "#5856D6",
    colorPrimaryTextActive: "#AF52DE",
    colorBgLayout: "#fff",
    wireframe: false,
  },
  darkAlgorithmblack: {
    colorPrimary: "#c6c7f8",
    colorInfo: "#95a4fc",
    colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
    colorPrimaryBorder: "#6b6fa5",
    colorPrimaryHover: "#b9b9d4",
    colorBgLayout: "#141414",
    wireframe: false,
  },
  purple: {
    colorPrimary: "#5856D6",
    colorInfo: "#5856D6",
    colorPrimaryLight: "#F7F9FB",
    colorSuccess: "#34c759",
    colorPrimaryBg: "#5856D6",
    colorInfoHover: "#ab6dca",
    colorBgLayout: "#fff",
    wireframe: false,
  },
  darkAlgorithmpurple: {
    colorInfo: "#5856D6",
    colorSuccess: "#34c759",
    colorPrimary: "#5856D6",
    colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
    colorInfoHover: "#ab6dca",
    colorBgLayout: "#141414",
    wireframe: false,
  },
  green: {
    colorPrimary: "#57b329",
    colorInfo: "#1b862c",
    colorPrimaryLight: "#F7F9FB",
    colorPrimaryBg: "#57b329",
    colorInfoHover: "#3db952",
    colorBgLayout: "#fff",
    wireframe: false,
  },
  darkAlgorithmgreen: {
    colorPrimary: "#57b329",
    colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
    colorInfo: "#1b862c",
    colorInfoHover: "#3db952",
    colorBgLayout: "#141414",
    wireframe: false,
  },
  blue: {
    colorPrimary: "#1677ff",
    colorPrimaryLight: "#F7F9FB",
    colorPrimaryBg: "#1677ff",
    colorInfo: "#1668dc",
    colorBgLayout: "#fff",
    wireframe: false,
  },
  darkAlgorithmblue: {
    colorPrimary: "#1677ff",
    colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
    colorInfo: "#1668dc",
    colorBgLayout: "#141414",
    wireframe: false,
  },
};
