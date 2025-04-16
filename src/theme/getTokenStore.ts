/*
 * @Description: 当前存储的主题配置
 */
import { useThemeToken } from "@store/modules/themeTokenData";
import type { AliasToken } from "ant-design-vue/es/theme/interface";

/** 存储当前主题 */
export const setToken = (token: AliasToken) => {
  useThemeToken().setThemeToken(token);
};

// 常用的一些主题配置
/** 边框颜色 */
export const borderColorSecondary = () =>
  useThemeToken().token.colorBorderSecondary;
/** 文字悬浮背景颜色 */
export const textHoverBgColor = () => useThemeToken().token.colorBgTextHover;
/** 常用颜色 */
export const commonColor = () => {
  return {
    green: useThemeToken().token.colorSuccess,
    red: useThemeToken().token.colorError,
    gold: useThemeToken().token.colorWarning,
    themeColor: useThemeToken().token.colorPrimary,
  };
};
/** 背景色 */
export const BgLayoutColor = () => useThemeToken().token.colorBgLayout;
