/*
 * @Author: wangqiaoling
 * @Date: 2023-12-20 10:33:25
 * @LastEditTime: 2024-01-11 16:03:12
 * @LastEditors: wangqiaoling
 * @Description: 动态设置布局模式
 */
import { useThemeStore } from "@store/modules/setting";
const themeStore = useThemeStore();

export function useLayout() {
  /**
   * @description 布局模式
   */
  const layoutList = {
    noSider: "顶部模式",
    mixinLeft: "混合模式1",
    mixinRight: "混合模式2",
    custom: "左侧模式",
  };

  function layoutChange(layout: string) {
    themeStore.setLayout(layout);
  }
  return {
    layoutList,
    layoutChange,
  };
}
