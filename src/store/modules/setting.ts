/*
 * @Author: wangqiaoling
 * @Date: 2023-11-09 10:21:19
 * @LastEditTime: 2024-01-11 16:10:04
 * @LastEditors: wangqiaoling
 * @Description: 主题和布局配置
 */
import { storage } from "@utils/reStorage";
import { defineStore } from "pinia";

const themesStorage = storage.get("themes");
const greyStorage = storage.get("grey");
const weakStorage = storage.get("weak");
const headColorStorage = storage.get("headColor");
const lightMenuStorage = storage.get("lightMenu");

export const useThemeStore = defineStore({
  id: "layoutData",
  state: () => ({
    name: themesStorage?.layoutName,
    footer: themesStorage?.hasFooter,
    type: themesStorage?.themeType,
    color: themesStorage?.themeColor,
    time: themesStorage?.expireTime,
    grey:
      greyStorage?.isGrey === undefined
        ? JSON.parse(import.meta.env.VITE_IS_GREY)
        : greyStorage?.isGrey,
    weak: weakStorage?.isWeak,
    headColor: headColorStorage?.headColor,
    lightMenu: lightMenuStorage?.lightMenu,
  }),
  getters: {
    layoutName: (state) => state.name,
    hasFooter: (state) => state.footer,
    hasHeaderColor: (state) => state.headColor,
    isLightMenu: (state) => state.lightMenu,
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
          expireTime: expireTime,
        },
        expireTime // 该缓存将在7天后过期
      );
      this.name = name;
      this.footer = footer;
      this.type = type;
      this.color = color;
      this.time = expireTime;
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
          expireTime: this.time,
        },
        this.time // 过期时间使用用户初始化时传入的值
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
          expireTime: this.time,
        },
        this.time // 过期时间使用用户初始化时传入的值
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
          expireTime: this.time,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
    /**
     * @description 设置灰色模式
     * @param grey 是否设置
     */
    setGreyMode(grey: boolean) {
      this.grey = grey;
      /** 设置默认主题 */
      storage.set(
        "grey",
        {
          isGrey: grey,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
    /**
     * @description 设置色弱模式
     * @param weak 是否设置
     */
    setWeakMode(weak: boolean) {
      this.weak = weak;
      /** 设置默认主题 */
      storage.set(
        "weak",
        {
          isWeak: weak,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
    /**
     * @description 开启混搭模式
     * @param setColor 是否上色
     */
    setHeaderColor(setColor: boolean) {
      this.headColor = setColor;
      /** 设置默认主题 */
      storage.set(
        "headColor",
        {
          headColor: setColor,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
    /**
     * @description 开启浅色菜单
     * @param lightMenu 是否是浅色菜单
     */
    setLightMenu(lightMenu: boolean) {
      this.lightMenu = lightMenu;
      /** 设置默认主题 */
      storage.set(
        "lightMenu",
        {
          lightMenu: lightMenu,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
    /**
     * @description 设置隐藏页脚
     * @param footer 是否隐藏
     */
    setFooter(footer: boolean) {
      this.footer = footer;
      /** 设置默认主题 */
      storage.set(
        "themes",
        {
          layoutName: this.layoutName,
          hasFooter: footer,
          themeType: this.themeType,
          themeColor: this.themeColor,
          expireTime: this.time,
        },
        this.time // 过期时间使用用户初始化时传入的值
      );
    },
  },
});
