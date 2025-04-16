<script setup lang="ts">
import { emitter } from "@utils/provideConfig";
function uploadFile() {
  emitter.emit("globalUploaderSelect", "File");
}

function uploadFiles() {
  emitter.emit("globalUploaderSelect", "Files");
}
</script>

<template>
  <div>
    <a-space>
      <a-button @click="uploadFile">上传文件</a-button>
      <a-button @click="uploadFiles">上传文件夹</a-button>
    </a-space>
  </div>
</template>

<style lang="scss" scoped></style>
