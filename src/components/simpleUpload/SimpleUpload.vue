<!--
 * @Author: wangqiaoling
 * @Date: 2024-07-26 14:50:19
 * @LastEditTime: 2024-08-01 17:45:58
 * @LastEditors: wangqiaoling
 * @Description: 文件上传plus,支持分块、断点等功能，但是必须在mian.ts中进行全局引用。
 * @Description: 文档地址：https://github.com/simple-uploader/vue-uploader/blob/vue3/README_zh-CN.md
-->
<script setup lang="ts">
import { assign, union } from "lodash";
import { ACCEPT_CONFIG } from "./acceptFile";
// import SparkMD5 from 'spark-md5';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
const uploaderRef = ref(null);
const uploaderInstance = ref(null);
onMounted(() => {
  uploaderInstance.value = uploaderRef.value.uploader;
  notify({
    group: "foo-css",
    text: "测试",
    duration: -1,
  });
});

const props = defineProps({
  /** 是否需要拖动上传区域 */
  needDrop: {
    type: Boolean,
    default: false,
  },
  /**是否上传文件夹 */
  directory: {
    type: Boolean,
    default: true,
  },
  /**是否一次只能选择一个文件 */
  single: {
    type: Boolean,
    default: false,
  },
  /**接收的文件类型 */
  acceptType: {
    type: Object,
    default: () => ({
      type: "add", // add是指在ACCEPT_CONFIG的基础上新增文件类型，replace是指完全使用传入的文件类型
      value: [".md"],
    }),
  },
  /** 上传参数配置 */
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
    }),
  },
});

const defalutOptions = {
  // 服务器分片校验函数
  checkChunkUploadedByResponse: function (
    chunk: { offset: number },
    response_msg: string
  ) {
    let objMessage = JSON.parse(response_msg);
    // console.log(response_msg, "response_msg");
    if (objMessage.skipUpload) return true;
    return (objMessage.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0;
  },
  // 格式化剩余时间
  parseTimeRemaining: function (
    timeRemaining: number,
    parsedTimeRemaining: string
  ) {
    if (timeRemaining)
      return parsedTimeRemaining
        .replace(/\syears?/, "年")
        .replace(/\days?/, "天")
        .replace(/\shours?/, "小时")
        .replace(/\sminutes?/, "分钟")
        .replace(/\sseconds?/, "秒");
  },
};
const options = assign(defalutOptions, props.options);

const attrs = {
  accept:
    props.acceptType.type === "add"
      ? union(props.acceptType.value, ACCEPT_CONFIG.getAll())
      : props.acceptType.value,
};

const statusText = {
  success: "上传成功",
  error: "上传失败",
  uploading: "上传中",
  paused: "暂停中",
  waiting: "等待中",
};

/** 成功上传的文件总大小 */
const successFileSizeText = computed(() => {
  return uploaderInstance.value.sizeUploaded();
});
/** 文件是否上传完成(包含上传中、上传完成和失败) */
const isUploading = ref<boolean | string>(false);

function onComplete() {
  console.log("是否上传完成", uploaderInstance.value.isUploading());
  // isUploading.value = true;
}

function onFileError() {
  isUploading.value = "error";
}

function onFileProgress() {
  isUploading.value = uploaderInstance.value.isUploading();
}

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

// @file-added="onFileAdded"
//     @file-success="onFileSuccess"
//     @file-error="onFileError"
</script>

<template>
  <div>
    <uploader
      :options="options"
      :file-status-text="statusText"
      class="uploader-ui"
      ref="uploaderRef"
      @complete="onComplete"
      @file-error="onFileError"
      @file-progress="onFileProgress"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop v-if="props.needDrop">
        <p class="uploader-drop-text">+ 拖动文件到这里自动上传，或者</p>
      </uploader-drop>
      <uploader-btn :attrs="attrs">选择文件</uploader-btn>
      <uploader-btn :directory="props.directory">选择文件夹</uploader-btn>
      <Notifications
        group="foo-css"
        title="Authorization"
        :width="600"
        animation-name="v-fade-left"
        position="bottom right"
        class="uploader-list-notification"
      >
        <template #body="{ item }">
          <div class="custom-template">
            <div
              class="custom-template-title inline-flex justify-between items-center w-full"
            >
              <div class="custom-template-status">
                <a-space>
                  <CloseCircleOutlined
                    class="status-icon error-icon"
                    v-if="isUploading === 'error'"
                  />
                  <SyncOutlined
                    class="status-icon loading-icon"
                    spin
                    v-else-if="isUploading"
                  />
                  <CheckCircleOutlined
                    v-else
                    class="status-icon completed-icon"
                  />
                  <span class="upload-status-title">{{
                    isUploading === "error"
                      ? "有文件上传出错"
                      : isUploading
                      ? "文件上传中"
                      : "全部上传完成"
                  }}</span>
                </a-space>
              </div>
              <div class="custom-template-close-icon">
                <CloseOutlined class="close-icon cursor-pointer" />
              </div>
            </div>

            <div class="custom-template-count">
              <span>已上传 1 个任务，共 {{ successFileSizeText }} KB</span>
            </div>

            <div class="custom-template-content">
              <uploader-list></uploader-list>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </template>
      </Notifications>
    </uploader>
  </div>
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

  .uploader-list-notification {
    right: 24px !important;
    bottom: 24px !important;
    background-color: var(--colorBgContainer);
    border: 1px solid var(--colorBorderSecondary);
    border-radius: 6px;
    box-shadow: var(--boxShadowSecondary);

    .custom-template {
      .custom-template-title {
        padding: 16px 16px 8px;

        .status-icon {
          font-size: 22px;
        }

        .error-icon {
          color: var(--colorError);
        }

        .completed-icon {
          color: var(--colorSuccess);
        }

        .loading-icon {
          color: var(--colorPrimary);
        }

        .upload-status-title {
          font-size: 18px;
          font-weight: 500;
        }

        .close-icon {
          font-size: 18px;

          // color: var(--colorSuccess);
        }
      }

      .custom-template-count {
        width: 100%;
        padding: 0 16px;
        margin: 8px 0;
        background-color: var(--colorPrimaryLight);

        span {
          line-height: 40px;
          color: var(--colorTextSecondary);
        }
      }

      .custom-template-content {
        padding-bottom: 16px;
      }
    }
  }
}
</style>
