<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:31:13
 * @LastEditTime: 2024-04-09 14:57:08
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

function hexColorStyle(color: string | undefined) {
  if (color && color.includes("#")) {
    return {
      color: color,
    };
  }
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
      return "green-btn-color";
    case "warn":
      return "orange-btn-color";
    case "danger":
      return "red-btn-color";
    default:
      break;
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
      :style="hexColorStyle(item.color)"
      :class="['px-0', convertColor(item.color)]"
      :type="extraProps.actionsType"
      :disabled="actionIsDisabled(item.disable, props.cellData.record)"
      v-show="!actionIsDisabled(item.hide, props.cellData.record)"
      >{{ item.text }} <a-divider v-show="isShowDivider(index)" type="vertical"
    /></a-button>
  </span>
</template>

<style lang="scss" scoped>
.green-btn-color {
  color: var(--colorSuccess);

  &:hover {
    color: var(--colorSuccessBorderHover);
  }
}

.orange-btn-color {
  color: var(--colorWarning);

  &:hover {
    color: var(--colorWarningBorderHover);
  }
}

.red-btn-color {
  color: var(--colorError);

  &:hover {
    color: var(--colorErrorBorderHover);
  }
}

.ant-btn-link:disabled {
  color: var(--colorTextDisabled);
}
</style>
