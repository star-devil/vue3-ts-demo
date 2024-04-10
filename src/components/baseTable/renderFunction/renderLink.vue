<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-25 09:30:39
 * @LastEditTime: 2024-04-09 16:32:56
 * @LastEditors: wangqiaoling
 * @Description: 单元格link链接，用于页面跳转或者打开新页面包括iframe
-->
<script setup lang="ts">
import { actionIsDisabled, covertFunction } from "@utils/provideConfig";

const props = defineProps(["cellData"]);
const extraProps = props.cellData.column.extraProps || {};
let aProps = ref();
onBeforeMount(() => {
  aProps.value = covertFunction(extraProps, props.cellData.record);
});
</script>

<template>
  <a-button
    class="px-0"
    type="link"
    v-bind.prop="aProps"
    :disabled="actionIsDisabled(aProps.disable, props.cellData.record)"
    >{{ cellData.text }}</a-button
  >
</template>
