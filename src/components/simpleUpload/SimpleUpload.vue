<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-26 14:50:19
 * @LastEditTime: 2024-07-26 17:46:49
 * @LastEditors: wangqiaoling
 * @Description: 文件上传plus,支持分块、断点等功能，但是必须在mian.ts中进行全局引用。
 * @Description: 文档地址：https://github.com/simple-uploader/vue-uploader/blob/vue3/README_zh-CN.md
-->
<script setup lang="ts">
import { union } from "lodash";
import { ACCEPT_CONFIG } from "./acceptFile";

const props = defineProps({
  acceptType: {
    type: Object,
    default: () => ({
      type: "add", // add是指在ACCEPT_CONFIG的基础上新增文件类型，replace是指完全使用传入的文件类型
      value: [".md"],
    }),
  },
});

const uploaderRef = ref(null);
const options = {
  target: "//jsonplaceholder.typicode.com/posts/", // 测试地址,
  testChunks: false,
};

const attrs = {
  accept:
    props.acceptType.type === "add"
      ? union(props.acceptType.value, ACCEPT_CONFIG.getAll())
      : props.acceptType.value,
};

const statusText = {
  success: "成功了",
  error: "出错了",
  uploading: "上传中",
  paused: "暂停中",
  waiting: "等待中",
};

const complete = function () {
  console.log("complete", arguments);
};
const fileComplete = function () {
  console.log("file complete", arguments);
};

onMounted(() => {
  console.log("uploaderRef--", uploaderRef.value.uploader);
});
</script>

<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-ui"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p class="uploader-drop-text">拖动文件到这里自动上传，或者</p>
    </uploader-drop>
    <uploader-btn :attrs="attrs">选择文件</uploader-btn>
    <uploader-btn :directory="true">选择文件夹</uploader-btn>
    <uploader-list></uploader-list>
  </uploader>
</template>

<style lang="scss" scoped>
.uploader-ui {
  min-width: 80px;

  .uploader-drop {
    background-color: var(--colorPrimaryBg);
    border-radius: 4px;

    &:hover {
      cursor: pointer;
      border-color: var(--colorPrimary);
      transition: all 0.3s;
    }

    .uploader-drop-text {
      color: var(--colorTextSecondary);
      text-align: center;
    }
  }

  .uploader-btn {
    display: inline-block;
    padding: 4px 15px;
    margin: 8px 8px 0 0;
    line-height: 22px;
    color: #fff;
    white-space: nowrap;
    background-color: var(--colorPrimary);
    border-color: var(--colorPrimaryBorder);
    border-radius: 4px;

    &:hover {
      background-color: var(--colorPrimaryHover);
      box-shadow: 0 2px 0 rgb(220 224 250 / 50%);
    }
  }

  .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow: hidden auto;
  }
}
</style>
