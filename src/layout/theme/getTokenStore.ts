/*
 * @Author: wangqiaoling
 * @Date: 2023-12-28 10:04:01
 * @LastEditTime: 2023-12-28 14:00:51
 * @LastEditors: wangqiaoling
 * @Description: 当前存储的主题配置
 */
import { useThemeToken } from "@store/modules/themeTokenData";
import type { AliasToken } from "ant-design-vue/es/theme/interface";

const themeToken = useThemeToken();

/** 存储当前主题 */
export const setToken = (token: AliasToken) => {
  themeToken.setThemeToken(token);
};

// 常用的一些主题配置
/** 主要颜色 */
export const primaryColor = () => useThemeToken().token.colorPrimary;
/** 边框颜色 */
export const borderColorSecondary = () =>
  useThemeToken().token.colorBorderSecondary;
/** 文字悬浮背景颜色 */
export const textHoverBgColor = () => useThemeToken().token.colorBgTextHover;
/** 主文字颜色 */
export const colorText = () => useThemeToken().token.colorText;
/** 次要提示文字颜色 */
export const textDescriptionColor = () =>
  useThemeToken().token.colorTextDescription;
