<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-26 14:50:19
 * @LastEditTime: 2024-07-29 17:16:03
 * @LastEditors: wangqiaoling
 * @Description: 文件上传plus,支持分块、断点等功能，但是必须在mian.ts中进行全局引用。
 * @Description: 文档地址：https://github.com/simple-uploader/vue-uploader/blob/vue3/README_zh-CN.md
-->
<script setup lang="ts">
import { union } from "lodash";
import { ACCEPT_CONFIG } from "./acceptFile";
// import SparkMD5 from 'spark-md5';

const props = defineProps({
  acceptType: {
    type: Object,
    default: () => ({
      type: "add", // add是指在ACCEPT_CONFIG的基础上新增文件类型，replace是指完全使用传入的文件类型
      value: [".md"],
    }),
  },
  options: {
    type: Object,
    default: () => ({
      target: "//jsonplaceholder.typicode.com/posts/",
      query: {},
      headers: {
        token: "", // 需要携带token信息,看各情况具体定义
      },
      testChunks: true, //是否开启服务器分片校验,对应GET类型同名的target URL
      chunkSize: "2048000", //分块大小(单位:字节)
      fileParameterName: "upfile", //上传文件时文件内容的参数名,对应chunk里的Multipart对象名名,默认对象名为file
      maxChunkRetries: 3, //失败后最多自动重试上传次数
      // 服务器分片校验函数
      checkChunkUploadedByResponse: function (
        chunk: { offset: number },
        response_msg: string
      ) {
        let objMessage = JSON.parse(response_msg);
        console.log(response_msg, "response_msg");
        if (objMessage.skipUpload) return true;
        return (objMessage.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0;
      },
    }),
  },
});

const uploaderRef = ref(null);
const options = {
  ...props.options,
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

onMounted(() => {
  console.log("uploaderRef--", uploaderRef.value.uploader);
});

// function onFileAdded(file) {
//   computeMD5(file);
// }

// function onFileSuccess(rootFile, file, response, chunk) {
//   //refProjectId为预留字段，可关联附件所属目标，例如所属档案，所属工程等
//   file.refProjectId = "123456789";
//   mergeFile(file)
//     .then((responseData) => {
//       if (responseData.data.code === 415) {
//         console.log("合并操作未成功，结果码：" + responseData.data.code);
//       }
//       message.success(responseData.data);
//     })
//     .catch(function (error) {
//       console.log("合并后捕获的未知异常：" + error);
//     });
// }
// function onFileError(rootFile, file, response, chunk) {
//   console.log("上传完成后异常信息：" + response);
// }

// /**
//  * 计算md5，实现断点续传及秒传
//  * @param file
//  */
// function computeMD5(file) {
//   file.pause();

//   //单个文件的大小限制2G
//   let fileSizeLimit = 2 * 1024 * 1024 * 1024;
//   console.log("文件大小：" + file.size);
//   console.log("限制大小：" + fileSizeLimit);
//   if (file.size > fileSizeLimit) {
//     file.cancel();
//   }

//   let fileReader = new FileReader();
//   let time = new Date().getTime();
//   let blobSlice =
//     File.prototype.slice ||
//     File.prototype.mozSlice ||
//     File.prototype.webkitSlice;
//   let currentChunk = 0;
//   const chunkSize = 10 * 1024 * 1000;
//   let chunks = Math.ceil(file.size / chunkSize);
//   let spark = new SparkMD5.ArrayBuffer();
//   //由于计算整个文件的Md5太慢，因此采用只计算第1块文件的md5的方式
//   let chunkNumberMD5 = 1;

//   loadNext();

//   fileReader.onload = (e) => {
//     spark.append(e.target.result);

//     if (currentChunk < chunkNumberMD5) {
//       loadNext();
//     } else {
//       let md5 = spark.end();
//       file.uniqueIdentifier = md5;
//       file.resume();
//       console.log(
//         `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
//           file.size
//         } 用时：${new Date().getTime() - time} ms`
//       );
//     }
//   };

//   fileReader.onerror = function () {
//     error(`文件${file.name}读取出错，请检查该文件`);
//     file.cancel();
//   };

//   function loadNext() {
//     let start = currentChunk * chunkSize;
//     let end = start + chunkSize >= file.size ? file.size : start + chunkSize;

//     fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
//     currentChunk++;
//     console.log("计算第" + currentChunk + "块");
//   }
// }
</script>

<template>
  <!-- @file-added="onFileAdded"
    @file-success="onFileSuccess"
    @file-error="onFileError" -->
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-ui"
    ref="uploaderRef"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p class="uploader-drop-text">+ 拖动文件到这里自动上传，或者</p>
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
    max-height: 340px;
    margin-top: 8px;
    overflow: hidden auto;
    color: var(--colorPrimaryText);
  }
}
</style>
