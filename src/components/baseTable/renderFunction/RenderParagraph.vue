<script setup lang="ts">
const props = defineProps(["cellData"]);
const extraProps = props.cellData.column.extraProps || {};
let witchType = computed(() => {
  return extraProps.ellipsis?.expandable;
});
</script>

<template>
  <fold-typography
    v-if="witchType"
    v-bind.prop="extraProps.ellipsis"
    :text="cellData.text"
  />

  <a-typography-text
    v-else
    v-bind.prop="extraProps"
    :style="{ width: cellData.column.width - 20 + 'px' }"
    :ellipsis="{ tooltip: cellData.text, ...extraProps.ellipsis }"
    :content="cellData.text"
  />
</template>
