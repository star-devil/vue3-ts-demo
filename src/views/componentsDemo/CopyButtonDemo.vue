<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-25 16:12:28
 * @LastEditTime: 2024-07-25 16:18:33
 * @LastEditors: wangqiaoling
 * @Description: 复制按钮示例
-->
<script setup lang="ts">
const text = "这里是需要复制的内容，复制成功后，请到下方输入框进行粘贴验证";
</script>

<template>
  <div>
    <p>
      基于a-typography-paragraph封装的复制按钮，可以将复制功能和文案展示分离，无需下载别的插件
    </p>
    <a-divider />
    <b>
      <p>{{ text }}</p>
    </b>
    <CopyButton :code="text" />
    <a-divider />
    <a-textarea
      placeholder="可以在这里粘贴试试"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
  </div>
</template>
