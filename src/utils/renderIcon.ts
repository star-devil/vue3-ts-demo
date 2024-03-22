/*
 * @Author: wangqiaoling
 * @Date: 2024-03-22 10:05:52
 * @LastEditTime: 2024-03-22 10:06:33
 * @LastEditors: wangqiaoling
 * @Description: 渲染iconfont图标
 */
export function renderIcon(icon: string) {
  return h(window.IconFont, { type: icon });
}
