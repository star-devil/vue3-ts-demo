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
