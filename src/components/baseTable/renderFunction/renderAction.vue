<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:31:13
 * @LastEditTime: 2024-04-29 10:00:44
 * @LastEditors: wangqiaoling
 * @Description: 操作按钮组合
-->
<script setup lang="ts">
import { commonColor } from "@/theme/getTokenStore";
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

/** 处理文字按钮显示的十六进制颜色 */
function hexColorStyle(color: string | undefined) {
  if (color && color.includes("#")) {
    return {
      color: color,
    };
  }
}
/** @description 颜色值转化
 * success: 系统success颜色
 * warning: 系统warning颜色
 * danger: 系统error颜色
 * undefined: 当前默认颜色
 */
function convertColor(color: string | undefined) {
  switch (color) {
    case "success":
      return "green-btn-color";
    case "warning":
      return "orange-btn-color";
    case "danger":
      return "red-btn-color";
    default:
      break;
  }
}

function coverToolTipColor(color: string | undefined): string {
  if (color && color.includes("#")) {
    return color;
  }

  switch (color) {
    case "success":
      return commonColor().green;
    case "warning":
      return commonColor().gold;
    case "danger":
      return commonColor().red;
    default:
      break;
  }
}
</script>

<template>
  <span
    v-if="
      extraProps.actionsType === 'link' ||
      extraProps.actionsType === 'text' ||
      extraProps.actionsType === 'mixin' ||
      extraProps.actionsType === '' ||
      extraProps.actionsType === undefined
    "
  >
    <span
      v-for="(item, index) in extraProps.actions"
      :key="index"
      class="px-"
      v-show="!actionIsDisabled(item.hide, props.cellData.record)"
    >
      <a-button
        v-bind.prop="actionsProps[index]"
        :style="hexColorStyle(item.color)"
        :class="[
          extraProps.actionsType === 'text' ? 'px-1' : 'px-0',
          convertColor(item.color),
        ]"
        :type="extraProps.actionsType || 'link'"
        :disabled="actionIsDisabled(item.disable, props.cellData.record)"
        >{{ item.text }}
      </a-button>
      <a-divider v-show="isShowDivider(index)" type="vertical" />
    </span>
  </span>
  <span v-else-if="extraProps.actionsType === 'icon'">
    <a-tooltip
      v-for="(item, index) in extraProps.actions"
      :key="index"
      :title="item.text"
      :color="coverToolTipColor(item.color)"
      v-show="!actionIsDisabled(item.hide, props.cellData.record)"
      placement="topLeft"
    >
      <a-button
        v-bind.prop="actionsProps[index]"
        :style="hexColorStyle(item.color)"
        :class="['px-0', convertColor(item.color)]"
        :type="extraProps.actionsType"
        :disabled="actionIsDisabled(item.disable, props.cellData.record)"
      ></a-button>
      <a-divider type="vertical" v-show="isShowDivider(index)" />
    </a-tooltip>
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

.ant-btn-link:disabled,
.ant-btn-text:disabled,
.ant-btn-icon:disabled,
.ant-btn-mixin:disabled {
  color: var(--colorTextDisabled);
}
</style>
