/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2023-12-18 16:19:28
 * @LastEditors: wangqiaoling
 * @Description: 主题和布局配置
 */
import { storage } from "@utils/reStorage";
import { defineStore } from "pinia";

storage.set(
  "themes",
  {
    layoutName: "noSider", // 布局名称
    hasFooter: true, // 是否显示页脚
    themeType: "light", // 主题类型，light:亮色；dark:暗色
  },
  60 * 24 * 7 // 该缓存将在7天后过期
);

const { layoutName, hasFooter, themeType } = storage.get("themes");
export const useThemeStore = defineStore({
  id: "layoutData",
  state: () => ({
    layoutName,
    hasFooter,
    themeType,
  }),
  getters: {},
  actions: {},
});
