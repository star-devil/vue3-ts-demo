<script setup lang="ts">
import TextClamp from "vue3-text-clamp";
</script>

<template>
  <text-clamp v-bind="$attrs">
    <template #after="{ toggle, expanded, clamped }">
      <a-config-provider :autoInsertSpaceInButton="false" componentSize="small">
        <a-button
          v-if="expanded || clamped"
          @click="toggle"
          class="expand-button"
        >
          {{ clamped ? "更多" : "收起" }}
        </a-button>
      </a-config-provider>
    </template>
  </text-clamp>
</template>

<style lang="scss" scoped>
.expand-button {
  font-size: 12px;
}
</style>
