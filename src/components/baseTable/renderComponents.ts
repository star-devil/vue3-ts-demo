/*
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:11:04
 * @LastEditTime: 2024-03-26 09:45:32
 * @LastEditors: wangqiaoling
 * @Description: 表格扩展渲染
 */
import { ColumnType } from "ant-design-vue/es/table";
import { Component } from "vue";
import RenderAction from "./renderFunction/renderAction.vue";
import renderDefualt from "./renderFunction/renderDefualt.vue";
import RenderLink from "./renderFunction/renderLink.vue";
import RenderSwitch from "./renderFunction/renderSwitch.vue";
import RenderTags from "./renderFunction/renderTags.vue";

// 在这里根据需要处理自定义属性type
export type renderKey = "link" | "tags" | "action" | "switch" | undefined;
export const renderMap = new Map<renderKey, Component>([
  ["link", RenderLink],
  ["tags", RenderTags],
  ["action", RenderAction],
  ["switch", RenderSwitch],
  [undefined, renderDefualt],
]);

export function disposeColumns(column: ColumnType<any>) {
  return (column as { type: renderKey }).type;
}
