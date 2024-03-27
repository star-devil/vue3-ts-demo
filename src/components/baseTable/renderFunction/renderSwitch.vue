<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 16:19:29
 * @LastEditTime: 2024-03-27 16:07:12
 * @LastEditors: wangqiaoling
 * @Description: 单元格开关
-->
<script setup lang="ts">
import { forIn } from "lodash";
const props = defineProps(["cellData"]);
const switchProps = reactive(props.cellData.column.extraProps);
// 表格switch开关
const loading = ref<boolean>(false);
const switchChange = async (
  checked: string | boolean | number,
  record: any
) => {
  loading.value = true;
  if (switchProps.changeFun) {
    await switchProps.changeFun(checked, record);
    loading.value = false;
  }
};
const switchClick = (checked: string | boolean | number, record: any) => {
  switchProps.clickFun && switchProps.clickFun(checked, record);
};
const switchIsDisabled = (record: any) => {
  let disabled = true;
  if (switchProps.disabled) {
    forIn(switchProps.disabled, (value, key) => {
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
    v-bind="switchProps"
    :checked="
      cellData.record[cellData.column.dataIndex] === switchProps.checked
    "
    :disabled="switchIsDisabled(cellData.record)"
    :loading="loading"
    @change="(checked) => switchChange(checked, cellData.record)"
    @click="(checked) => switchClick(checked, cellData.record)"
  />
</template>
