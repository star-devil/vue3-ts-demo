<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-25 14:50:47
 * @LastEditTime: 2024-07-25 15:13:19
 * @LastEditors: wangqiaoling
 * @Description: 基于a-typography-paragraph封装的复制按钮，无需下载别的插件
-->
<script setup lang="ts">
const copyTextRef = ref(null);

const copyText = ref("复制");

defineProps({
  code: {
    type: String,
    default: "这是需要复制的文案",
  },
});

/** 点击button触发a-typography-paragraph内部的复制方法 */
function emitCopyFun() {
  copyTextRef.value.children[0].click();
}
function copyCode() {
  copyText.value = "成功";
  const timer = setTimeout(() => {
    copyText.value = "复制";
    timer && clearTimeout(timer);
  }, 3000);
}
</script>

<template>
  <a-button @click="emitCopyFun">
    <a-space>
      <a-typography-paragraph
        ref="copyTextRef"
        :copyable="{ text: code, tooltip: false, onCopy: copyCode }"
      />
      {{ copyText }}
    </a-space>
  </a-button>
</template>
<style lang="scss" scoped>
.ant-typography {
  margin-bottom: 0;
}
</style>
