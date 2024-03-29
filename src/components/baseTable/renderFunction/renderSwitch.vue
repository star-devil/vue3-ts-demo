<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 16:19:29
 * @LastEditTime: 2024-03-28 18:19:57
 * @LastEditors: wangqiaoling
 * @Description: 单元格开关
-->
<script setup lang="ts">
import { covertFunction } from "@utils/provideConfig";
import { forIn } from "lodash";
const props = defineProps(["cellData"]);

const extraProps = props.cellData.column.extraProps || {};
let switchProps = ref();
onBeforeMount(() => {
  switchProps.value = covertFunction(extraProps, props.cellData.record);
  console.log("record=----", switchProps.value, props.cellData.record.key);
});

const switchIsDisabled = () => {
  console.log("switchIsDisabled-");
  const record = props.cellData.record;
  let disabled = true;
  if (switchProps.value.disabled) {
    forIn(switchProps.value.disabled, (value, key) => {
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
    v-bind.prop="switchProps"
    :checked="
      cellData.record[cellData.column.dataIndex] === switchProps.checked
    "
    :disabled="switchIsDisabled()"
  />
</template>
