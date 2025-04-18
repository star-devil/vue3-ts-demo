/*
 * @Description: 存储当前主题配置
 */
import type { AliasToken } from "ant-design-vue/es/theme/interface";
import { defineStore } from "pinia";
export const useThemeToken = defineStore({
  id: "themeTokenData",
  state: () => ({
    token: {} as AliasToken,
  }),
  actions: {
    /**
     * 将当前主题配置存储下来，以便在样式文件中使用
     * @param token 当前主题配置对象
     */
    setThemeToken(token: AliasToken) {
      this.token = token;
    },
  },
});
