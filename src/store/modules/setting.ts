/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2023-12-27 11:08:48
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
    color: themesStorage?.themeColor,
    expireTime: 0,
  }),
  getters: {
    layoutName: (state) => state.name,
    hasFooter: (state) => state.footer,
    themeType: (state) => state.type,
    themeColor: (state) => {
      const color: string = state.color.split("darkAlgorithm")[1];
      if (state.type === "light" && color) {
        return color;
      } else if (state.type === "dark" && !color) {
        return "darkAlgorithm" + state.color;
      } else {
        return state.color;
      }
    },
  },
  actions: {
    /**
     * @description 设置主题
     * @param name 布局名称
     * @param footer 是否显示页脚
     * @param type 主题类型，light:亮色；dark:暗色
     * @param expireTime 过期时间，单位分钟
     */
    setTheme(
      name: string,
      footer: boolean,
      type: string,
      color: string,
      expireTime: number
    ) {
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: name,
          hasFooter: footer,
          themeType: type,
          themeColor: color,
        },
        expireTime // 该缓存将在7天后过期
      );
      this.name = name;
      this.footer = footer;
      this.type = type;
      this.color = color;
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
          themeColor: this.themeColor,
        },
        this.expireTime // 缓存使用用户初始化时传入的值
      );
    },
    /**
     * @description 设置布局模式
     * @param name 布局名称
     */
    setLayout(name: string) {
      this.name = name;
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: name,
          hasFooter: this.hasFooter,
          themeType: this.themeType,
          themeColor: this.themeColor,
        },
        this.expireTime // 缓存使用用户初始化时传入的值
      );
    },
    /**
     * @description 设置主题颜色
     * @param color 颜色名称
     */
    setThemeColor(color: string) {
      this.color = color;
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: this.layoutName,
          hasFooter: this.hasFooter,
          themeType: this.themeType,
          themeColor: color,
        },
        this.expireTime // 缓存使用用户初始化时传入的值
      );
    },
  },
});
