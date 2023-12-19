/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2023-12-19 16:47:30
 * @LastEditors: wangqiaoling
 * @Description: 主题和布局配置
 */
import { storage } from "@utils/reStorage";
import { defineStore } from "pinia";

const themesStorage = storage.get("themes");
export const useThemeStore = defineStore({
  id: "layoutData",
  state: () => ({
    name: themesStorage?.layoutName,
    footer: themesStorage?.hasFooter,
    type: themesStorage?.themeType,
    expireTime: 0,
  }),
  getters: {
    layoutName: (state) => state.name,
    hasFooter: (state) => state.footer,
    themeType: (state) => state.type,
  },
  actions: {
    /**
     * @description 设置主题
     * @param name 布局名称
     * @param footer 是否显示页脚
     * @param type 主题类型，light:亮色；dark:暗色
     * @param expireTime 过期时间，单位分钟
     */
    setTheme(name: string, footer: boolean, type: string, expireTime: number) {
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: name,
          hasFooter: footer,
          themeType: type,
        },
        expireTime // 该缓存将在7天后过期
      );
      this.expireTime = expireTime;
    },
    /**
     * @description 设置主题类型
     * @param type 主题类型，light:亮色；dark:暗色
     */
    setThemeType(type: string) {
      this.type = type;
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: this.layoutName,
          hasFooter: this.hasFooter,
          themeType: type,
        },
        this.expireTime // 缓存使用用户初始化时传入的值
      );
    },
  },
});
