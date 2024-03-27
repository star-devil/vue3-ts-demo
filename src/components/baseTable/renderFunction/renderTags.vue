<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:29:47
 * @LastEditTime: 2024-03-27 11:19:39
 * @LastEditors: wangqiaoling
 * @Description: 单元格内渲染标签
-->
<script setup lang="ts">
import {
  createColorPicker,
  isItemArray,
  isObjectArray,
} from "@utils/provideConfig";
import { find, isArray } from "lodash";
import { ComplexColor } from "../type";

const props = defineProps(["cellData"]);
const tagProps = reactive(props.cellData.column.extraProps);
const tagIsList = computed(() => {
  return isArray(props.cellData.record[props.cellData.column.dataIndex]);
});

const getColor = createColorPicker(tagProps.colors);
/** 处理标签颜色:
 * 传入的标签颜色可以是字符串、数组和集合
 * 字符串表示所有标签显示同一个颜色；
 * 数组表示所有标签顺序循环显示数组内颜色；
 * 集合表示特定字段特定值显示指定颜色：
 *  对象格式：{value: 字段值,color: 显示颜色}
 *  注意⚠️：字段值只支持字符串/数字/undefined/null类型
 */
function convertColor(targetValue?: any): string | null {
  let foundColor: ComplexColor | null;
  switch (typeof tagProps.colors) {
    case "string":
      return tagProps.colors;
    case "object":
      if (isItemArray(tagProps.colors)) {
        return getColor();
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
</script>

<template>
  <span v-if="tagIsList">
    <a-tag
      v-bind.attr="tagProps"
      v-for="tag in cellData.record[cellData.column.dataIndex]"
      :key="tag"
      :color="convertColor(tag)"
    >
      {{ tag.toUpperCase() }}
    </a-tag>
  </span>
  <span v-else>
    <a-tag v-bind.attr="tagProps" :color="convertColor()">
      {{ cellData.record[cellData.dataIndex] }}
    </a-tag>
  </span>
</template>
