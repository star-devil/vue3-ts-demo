import { ColumnType } from "ant-design-vue/es/table";
import { Component } from "vue";
import RenderAction from "./renderFunction/RenderAction.vue";
import RenderBadge from "./renderFunction/RenderBadge.vue";
import RenderDefualt from "./renderFunction/RenderDefualt.vue";
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
  | "badge"
  | undefined;
export const renderMap = new Map<renderKey, Component>([
  ["link", RenderLink],
  ["tags", RenderTags],
  ["action", RenderAction],
  ["switch", RenderSwitch],
  ["paragraph", RenderParagraph],
  ["badge", RenderBadge],
  [undefined, RenderDefualt],
]);

export function disposeColumns(column: ColumnType<any>) {
  return (column as { type: renderKey }).type;
}
