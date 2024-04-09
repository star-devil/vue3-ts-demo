<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:31:13
 * @LastEditTime: 2024-04-09 13:56:56
 * @LastEditors: wangqiaoling
 * @Description: 操作按钮组合
-->
<script setup lang="ts">
import { actionIsDisabled, covertFunction } from "@utils/provideConfig";
const props = defineProps(["cellData"]);
const extraProps = props.cellData.column.extraProps || {};
let actionsProps = ref([]);
onBeforeMount(() => {
  actionsProps.value = [];
  extraProps.actions.map((item: any) => {
    actionsProps.value.push(covertFunction(item.props, props.cellData.record));
  });
});

/** 最后一项不显示分隔符 */
function isShowDivider(index: number) {
  return index < extraProps.actions.length - 1;
}

/** @description 颜色值转化
 * safe: 系统success颜色
 * warn: 系统warning颜色
 * danger: 系统error颜色
 * undefined: 当前默认颜色
 */
function convertColor(color: string | undefined) {
  switch (color) {
    case "safe":
      return "#52c41a";
    case "warn":
      return "#faad14";
    case "danger":
      return "#ff4d4f";
    case undefined:
      break;
    default:
      return color;
  }
}
</script>

<template>
  <span
    v-if="
      extraProps.actionsType === 'link' || extraProps.actionsType === 'text'
    "
  >
    <a-button
      v-for="(item, index) in extraProps.actions"
      v-bind.prop="actionsProps[index]"
      :key="index"
      class="px-0"
      :style="{ color: convertColor(item.color) }"
      :type="extraProps.actionsType"
      :disabled="actionIsDisabled(item.disable, props.cellData.record)"
      v-show="!actionIsDisabled(item.hide, props.cellData.record)"
      >{{ item.text }} <a-divider v-show="isShowDivider(index)" type="vertical"
    /></a-button>
  </span>
</template>

<style lang="scss" scoped></style>
