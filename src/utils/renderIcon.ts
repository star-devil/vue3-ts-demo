/*
 * @Description: 渲染iconfont图标
 */
export function renderIcon(icon: string) {
  return h(window.IconFont, { type: icon });
}
