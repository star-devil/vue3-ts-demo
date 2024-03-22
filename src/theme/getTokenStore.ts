/*
 * @Author: wangqiaoling
 * @Date: 2023-12-28 10:04:01
 * @LastEditTime: 2024-03-21 14:52:20
 * @LastEditors: wangqiaoling
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
