<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-11 13:18:30
 * @LastEditTime: 2024-07-26 11:12:08
 * @LastEditors: wangqiaoling
 * @Description: 代码编辑器示例
-->
<script setup lang="ts">
const code = ref(`<template>
  <div class="content-wrap">
    <CodeEditor />
  </div>
</template>`);

const language = "vue";

function getNewCode(newCode: string) {
  console.log("这里是新代码：", newCode);
}
</script>

<template>
  <div class="content-wrap">
    <CodeEditor :code="code" :language="language" @getNewCode="getNewCode" />
  </div>
</template>
