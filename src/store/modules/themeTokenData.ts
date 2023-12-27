/*
 * @Author: wangqiaoling
 * @Date: 2023-12-27 16:29:28
 * @LastEditTime: 2023-12-27 16:34:47
 * @LastEditors: wangqiaoling
 * @Description: 存储当前主题配置
 */
import { defineStore } from "pinia";

export const useThemeToken = defineStore({
  id: "themeTokenData",
  state: () => ({
    token: undefined,
  }),
  actions: {
    /**
     * 将当前主题配置存储下来，以便在样式文件中使用
     * @param token 当前主题配置对象
     */
    setThemeToken(token: any) {
      this.token = token;
      console.log(token);
    },
  },
});
