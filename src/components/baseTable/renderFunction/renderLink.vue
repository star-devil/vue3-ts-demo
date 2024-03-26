<script setup lang="ts">
defineProps(["cellData"]);
</script>

<template>
  <a>
    {{ cellData.text }}
  </a>
</template>

<style lang="scss" scoped></style>
