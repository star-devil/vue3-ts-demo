<script setup lang="ts">
import ReLayout from "./components/ReLayout.vue";
const waterMarkConfig = {
  font: {
    content: "Egg‘s demo",
    fontSize: 14,
  },
};
const showSet = import.meta.env.VITE_SHOW_SET === "true";
</script>

<template>
  <ReLayout :waterMarkModel="waterMarkConfig" :needSet="showSet" />
</template>

<style lang="scss" scoped></style>
