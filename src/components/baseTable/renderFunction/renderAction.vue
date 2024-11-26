<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:31:13
 * @LastEditTime: 2024-08-24 12:30:46
 * @LastEditors: wangqiaoling
 * @Description: 操作按钮组合
-->
<script setup lang="ts">
import { commonColor } from "@/theme/getTokenStore";
import { actionIsDisabled, covertFunction } from "@utils/provideConfig";

const props = defineProps(["cellData"]);
const extraProps = props.cellData.column.extraProps || {};
let actionsPropsMap = reactive({});
let popConfirmPropsMap = reactive({});
onBeforeMount(() => {
  bindDataToButton();
});

watch(
  () => props.cellData,
  () => {
    bindDataToButton();
  },
  { deep: true }
);

/** 动态绑定数据到按钮上 */
function bindDataToButton() {
  extraProps.actions.map((item: any, index: number) => {
    actionsPropsMap[index] = covertFunction(item.props, props.cellData.record); // 为点击按钮绑定当前点击行数据

    item.popConfirm &&
      (popConfirmPropsMap[index] = covertFunction(
        item.popConfirm,
        props.cellData.record
      )); // 为popconfirm绑定当前点击行数据
  });
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
  <span>
    <a-space
      v-if="
        extraProps.actionsType === 'link' ||
        extraProps.actionsType === 'text' ||
        extraProps.actionsType === 'mixin' ||
        extraProps.actionsType === '' ||
        extraProps.actionsType === undefined
      "
      :size="0"
    >
      <template #split>
        <a-divider type="vertical" />
      </template>
      <template v-for="(item, index) in extraProps.actions" :key="index">
        <template v-if="!actionIsDisabled(item.hide, props.cellData.record)">
          <a-popconfirm
            v-if="item.popConfirm"
            v-bind.prop="popConfirmPropsMap[index]"
          >
            <a-button
              v-bind.prop="actionsPropsMap[index]"
              :style="hexColorStyle(item.color)"
              :class="[
                extraProps.actionsType === 'text' ? 'px-1' : 'px-0',
                convertColor(item.color),
              ]"
              :type="extraProps.actionsType || 'link'"
              :disabled="actionIsDisabled(item.disable, props.cellData.record)"
              >{{ item.text }}
            </a-button>
          </a-popconfirm>
          <a-button
            v-else
            v-bind.prop="actionsPropsMap[index]"
            :style="hexColorStyle(item.color)"
            :class="[
              extraProps.actionsType === 'text' ? 'px-1' : 'px-0',
              convertColor(item.color),
            ]"
            :type="extraProps.actionsType || 'link'"
            :disabled="actionIsDisabled(item.disable, props.cellData.record)"
            >{{ item.text }}
          </a-button>
        </template>
      </template>
    </a-space>
    <a-space-compact block v-else-if="extraProps.actionsType === 'icon'">
      <a-tooltip
        v-for="(item, index) in extraProps.actions"
        :key="index"
        :title="item.text"
        :color="coverToolTipColor(item.color)"
        v-show="!actionIsDisabled(item.hide, props.cellData.record)"
        placement="topLeft"
      >
        <a-popconfirm
          v-if="item.popConfirm"
          v-bind.prop="popConfirmPropsMap[index]"
          placement="bottom"
        >
          <a-button
            v-bind.prop="actionsPropsMap[index]"
            :style="hexColorStyle(item.color)"
            :class="convertColor(item.color)"
            :disabled="actionIsDisabled(item.disable, props.cellData.record)"
          ></a-button>
        </a-popconfirm>
        <a-button
          v-else
          v-bind.prop="actionsPropsMap[index]"
          :style="hexColorStyle(item.color)"
          :class="convertColor(item.color)"
          :disabled="actionIsDisabled(item.disable, props.cellData.record)"
        ></a-button>
      </a-tooltip>
    </a-space-compact>
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
