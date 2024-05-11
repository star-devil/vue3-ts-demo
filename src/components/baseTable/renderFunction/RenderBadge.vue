<!--
 * @Author: wangqiaoling
 * @Date: 2024-05-09 15:19:54
 * @LastEditTime: 2024-05-11 10:45:44
 * @LastEditors: wangqiaoling
 * @Description: 单元格内渲染徽标
-->
<script setup lang="ts">
const props = defineProps(["cellData"]);
const extraProps = cloneDeep(props.cellData.column.extraProps) || {};
import { cloneDeep } from "lodash";
import { ComplexBadgeColor } from "../type";

/** @description 处理徽标颜色，包括color和status:
 * 传入的徽标颜色集合
 * 集合表示特定字段特定值显示指定颜色：
 *  对象格式：{value: 字段值,color/status: 显示颜色}
 *  ⚠️注意：字段值只支持字符串/数字/undefined/null类型
 */
const convertColorProps = (targetValue: number | string) => {
  const foundObject = (extraProps.colors as ComplexBadgeColor[]).find(
    (obj) => obj.value === targetValue
  );
  if (foundObject) {
    if (foundObject.color && foundObject.status) {
      extraProps.color = foundObject.color;
      extraProps.status = foundObject.status;
    } else if (foundObject.color) {
      extraProps.color = foundObject.color;
      extraProps.status = null;
    } else if (foundObject.status) {
      extraProps.status = foundObject.status;
      extraProps.color = null;
    }
  }
};

onBeforeMount(() => {
  extraProps.colors && convertColorProps(props.cellData.text);
});
</script>

<template>
  <a-badge v-bind.prop="extraProps" :text="cellData.text" />
</template>
