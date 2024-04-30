/*
 * @Author: wangqiaoling
 * @Date: 2024-03-22 14:11:04
 * @LastEditTime: 2024-04-30 14:12:16
 * @LastEditors: wangqiaoling
 * @Description: 表格扩展渲染
 */
import { ColumnType } from "ant-design-vue/es/table";
import { Component } from "vue";
import RenderAction from "./renderFunction/RenderAction.vue";
import renderDefualt from "./renderFunction/RenderDefualt.vue";
import RenderLink from "./renderFunction/RenderLink.vue";
import RenderParagraph from "./renderFunction/RenderParagraph.vue";
import RenderSwitch from "./renderFunction/RenderSwitch.vue";
import RenderTags from "./renderFunction/RenderTags.vue";

// 在这里根据需要处理自定义属性type
export type renderKey =
  | "link"
  | "tags"
  | "action"
  | "switch"
  | "paragraph"
  | undefined;
export const renderMap = new Map<renderKey, Component>([
  ["link", RenderLink],
  ["tags", RenderTags],
  ["action", RenderAction],
  ["switch", RenderSwitch],
  ["paragraph", RenderParagraph],
  [undefined, renderDefualt],
]);

export function disposeColumns(column: ColumnType<any>) {
  return (column as { type: renderKey }).type;
}
