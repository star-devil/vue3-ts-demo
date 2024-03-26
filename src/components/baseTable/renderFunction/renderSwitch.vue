<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 16:19:29
 * @LastEditTime: 2024-03-26 16:11:27
 * @LastEditors: wangqiaoling
 * @Description: 单元格开关
-->
<script setup lang="ts">
import { forIn } from "lodash";
const props = defineProps(["cellData"]);
const switchSetting = reactive(props.cellData.column.extraProps);

// 表格switch开关
const loading = ref<boolean>(false);
const switchChange = async (checked: boolean, record: any) => {
  loading.value = true;
  if (switchSetting.change) {
    await switchSetting.change(checked, record);
    loading.value = false;
  }
};
const switchClick = (checked: boolean, record: any) => {
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
    :loading="loading"
    @change="(checked) => switchChange(checked as boolean, cellData.record)"
    @click="(checked) => switchClick(checked as boolean, cellData.record)"
  />
</template>
