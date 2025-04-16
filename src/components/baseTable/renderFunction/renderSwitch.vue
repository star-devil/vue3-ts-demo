<script setup lang="ts">
import { actionIsDisabled, covertFunction } from "@utils/provideConfig";
const props = defineProps(["cellData"]);

const extraProps = props.cellData.column.extraProps || {};
let switchProps = ref();
onBeforeMount(() => {
  switchProps.value = covertFunction(extraProps, props.cellData.record);
});
</script>

<template>
  <a-switch
    v-bind.prop="switchProps"
    :checked="
      cellData.record[cellData.column.dataIndex] === switchProps.checked
    "
    :disabled="actionIsDisabled(switchProps.disable, props.cellData.record)"
  />
</template>
