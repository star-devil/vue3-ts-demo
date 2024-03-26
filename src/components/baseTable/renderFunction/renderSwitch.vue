<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 16:19:29
 * @LastEditTime: 2024-03-26 10:31:13
 * @LastEditors: wangqiaoling
 * @Description: 单元格开关
-->
<script setup lang="ts">
import { forIn } from "lodash";

const props = defineProps(["cellData"]);
const switchSetting = reactive(props.cellData.column.extraProps);

// 表格switch开关
const switchChange = (checked, record) => {
  switchSetting.change && switchSetting.change(checked, record);
};
const switchClick = (checked, record) => {
  switchSetting.click && switchSetting.click(checked, record);
};
const switchIsDisabled = (record) => {
  let disabled = true;
  if (switchSetting.disabled) {
    forIn(switchSetting.disabled, (value, key) => {
      if (record[key] !== value) {
        disabled = false;
        return;
      }
    });
  } else {
    disabled = false;
  }
  return disabled;
};
</script>

<template>
  <a-switch
    :checked="cellData.record.status === switchSetting.checkedValue"
    :checked-children="switchSetting.openText"
    :un-checked-children="switchSetting.closeText"
    :disabled="switchIsDisabled(cellData.record)"
    :size="switchSetting.size"
    @change="(checked) => switchChange(checked, cellData.record)"
    @click="(checked) => switchClick(checked, cellData.record)"
  />
</template>
