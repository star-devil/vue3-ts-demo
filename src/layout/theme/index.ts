/*
 * @Author: wangqiaoling
 * @Date: 2023-12-14 10:26:42
 * @LastEditTime: 2024-01-18 14:05:32
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
type theme = {
  components?: object;
  token: color;
};
export type ThemeColors = {
  black: theme;
  darkAlgorithmblack: theme;
  purple: theme;
  darkAlgorithmpurple: theme;
  green: theme;
  darkAlgorithmgreen: theme;
  blue: theme;
  darkAlgorithmblue: theme;
};
/** 预设主题色 */
export const themeColors: ThemeColors = {
  black: {
    components: {
      Menu: {
        colorItemBgSelected: "#C6C7F8CC",
      },
    },
    token: {
      colorPrimary: "#1c1c1c",
      colorPrimaryBg: "rgba(220, 224, 250, 0.5)",
      colorPrimaryLight: "#F7F9FB",
      colorInfo: "#5856D6",
      colorPrimaryTextActive: "#AF52DE",
      colorBgLayout: "#fff",
      wireframe: false,
    },
  },
  darkAlgorithmblack: {
    components: {
      Menu: {
        colorItemBgSelected: "#FFFFFF1A",
        colorItemTextSelected: "#95a4fc",
      },
    },
    token: {
      colorPrimary: "#8A8CD9",
      colorInfo: "#95a4fc",
      colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
      colorPrimaryBorder: "#6b6fa5",
      colorPrimaryHover: "#b9b9d4",
      colorBgLayout: "#141414",
      wireframe: false,
    },
  },
  purple: {
    token: {
      colorPrimary: "#5856D6",
      colorInfo: "#5856D6",
      colorPrimaryLight: "#F7F9FB",
      colorSuccess: "#34c759",
      colorInfoHover: "#ab6dca",
      colorBgLayout: "#fff",
      wireframe: false,
    },
  },
  darkAlgorithmpurple: {
    components: {
      Menu: {
        colorItemBgSelected: "#FFFFFF1A",
        colorItemTextSelected: "#6b69e3",
      },
    },
    token: {
      colorInfo: "#6b69e3",
      colorSuccess: "#34c759",
      colorPrimary: "#5856D6",
      colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
      colorInfoHover: "#ab6dca",
      colorBgLayout: "#141414",
      wireframe: false,
    },
  },
  green: {
    token: {
      colorPrimary: "#57b329",
      colorInfo: "#1b862c",
      colorPrimaryLight: "#F7F9FB",
      colorInfoHover: "#3db952",
      colorBgLayout: "#fff",
      wireframe: false,
    },
  },
  darkAlgorithmgreen: {
    components: {
      Menu: {
        colorItemBgSelected: "#FFFFFF1A",
        colorItemTextSelected: "#1b862c",
      },
    },
    token: {
      colorPrimary: "#57b329",
      colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
      colorInfo: "#1b862c",
      colorInfoHover: "#3db952",
      colorBgLayout: "#141414",
      wireframe: false,
    },
  },
  blue: {
    token: {
      colorPrimary: "#1677ff",
      colorPrimaryLight: "#F7F9FB",
      colorInfo: "#1668dc",
      colorBgLayout: "#fff",
      wireframe: false,
    },
  },
  darkAlgorithmblue: {
    components: {
      Menu: {
        colorItemBgSelected: "#FFFFFF1A",
        colorItemTextSelected: "#1668dc",
      },
    },
    token: {
      colorPrimary: "#1677ff",
      colorPrimaryLight: "rgba(255, 255, 255, 0.05)",
      colorInfo: "#1668dc",
      colorBgLayout: "#141414",
      wireframe: false,
    },
  },
};
