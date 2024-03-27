<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:29:47
 * @LastEditTime: 2024-03-27 14:11:48
 * @LastEditors: wangqiaoling
 * @Description: 单元格内渲染标签（只要数据结构支持，也可以用在任何适当的地方）
-->
<script setup lang="ts">
import { isItemArray, isObjectArray } from "@utils/provideConfig";
import { find, isArray } from "lodash";
import { VNode } from "vue";
import { ComplexColor, ComplexIcon } from "../type";

const props = defineProps(["cellData"]);
const tagProps = reactive(props.cellData.column.extraProps);
const tagFuns = props.cellData.column.extraFuncs || {};
const tagIsList = computed(() => {
  return isArray(props.cellData.record[props.cellData.column.dataIndex]);
});

/** @description 处理标签颜色:
 * 传入的标签颜色可以是字符串、数组和集合
 * 字符串表示所有标签显示同一个颜色；
 * 数组表示所有标签顺序循环显示数组内颜色；
 * 集合表示特定字段特定值显示指定颜色：
 *  对象格式：{value: 字段值,color: 显示颜色}
 *  ⚠️注意：字段值只支持字符串/数字/undefined/null类型
 */
function convertColor(targetValue?: any, index?: number): string | null {
  let foundColor: ComplexColor | null;
  switch (typeof tagProps.colors) {
    case "string":
      return tagProps.colors;
    case "object":
      if (isItemArray(tagProps.colors)) {
        return tagProps.colors[index % tagProps.colors.length];
      } else if (isObjectArray(tagProps.colors)) {
        foundColor = find(
          tagProps.colors,
          (item) => (item as ComplexColor).value === targetValue
        );
        return foundColor ? foundColor.color : null;
      }
      break;
    default:
      return null;
  }
}
/** @description 处理标签icon:
 * 传入的icon可以是单独的VNode、集合
 * VNode表示所有标签显示同一个图标
 * 集合表示特定字段特定值显示指定图标：
 *  对象格式：{value: 字段值,icon: 显示图标VNode}
 *  ⚠️注意：字段值只支持字符串/数字/undefined/null类型
 */
function convertIcon(targetValue?: any): VNode | null {
  if (isObjectArray(tagProps.icons)) {
    const foundIcon = find(
      tagProps.icons,
      (item) => (item as ComplexIcon).value === targetValue
    );
    return foundIcon ? foundIcon.icon : null;
  } else {
    return tagProps.icons;
  }
}
</script>

<template>
  <span v-if="tagIsList">
    <a-tag
      v-bind.attr="tagProps"
      v-on="tagFuns"
      v-for="(tag, index) in cellData.record[cellData.column.dataIndex]"
      :key="'tag_' + index"
      :color="convertColor(tag, index)"
      :icon="convertIcon(tag)"
    >
      {{ tag }}
    </a-tag>
  </span>
  <span v-else>
    <a-tag v-bind.attr="tagProps" :color="convertColor()" :icon="convertIcon()">
      {{ cellData.record[cellData.column.dataIndex] }}
    </a-tag>
  </span>
</template>
