<script setup lang="ts">
defineProps(["cellData"]);
</script>

<template>
  <span>{{ cellData.text }}</span>
</template>
