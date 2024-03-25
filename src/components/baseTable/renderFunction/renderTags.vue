<script setup lang="ts">
defineProps(["record"]);
</script>

<template>
  <span>
    <a-tag
      v-for="tag in record.tags"
      :key="tag"
      :color="
        tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
      "
    >
      {{ tag.toUpperCase() }}
    </a-tag>
  </span>
</template>
