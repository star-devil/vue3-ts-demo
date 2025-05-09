<script setup lang="ts">
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { emitter, formatBytes } from "@utils/provideConfig";
import { Modal } from "ant-design-vue";
import { assign, union } from "lodash";
import { createVNode } from "vue";
import { ACCEPT_CONFIG } from "./acceptFile";

// 文件上传
const showList = ref<boolean>(false);
const uploaderRef = ref(null);
const uploaderInstance = ref(null);

// 文件列表通知框
const uploaderStatusTitle = ref<string>("请上传文件");
const collapseList = ref(["open"]);
// 上传文件按钮
const uploadFileButtonRef = ref(null);
// 上传文件夹按钮
const uploadFilesButtonRef = ref(null);

onMounted(() => {
  /** 触发上传文件按钮方法 */
  emitter.on("globalUploaderSelect", (flag: string) => {
    uploaderInstance.value = uploaderRef.value?.uploader;
    if (flag === "File") uploadFileButtonRef.value.$el.click();
    else uploadFilesButtonRef.value.$el.click();
  });
});

onUnmounted(() => {
  emitter.off("globalUploaderSelect");
  uploaderInstance.value.bootstrap();
});

const props = defineProps({
  /** 是否需要拖动上传区域 */
  needDrop: {
    type: Boolean,
    default: false,
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
  /** 是否自动上传 */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /** 上传参数配置 */
  options: {
    type: Object,
    default: () => ({}),
  },
});

const defalutOptions = {
  // 服务器分片校验函数
  checkChunkUploadedByResponse: function (
    chunk: { offset: number },
    response_msg: string
  ) {
    try {
      let objMessage = JSON.parse(response_msg);
      // console.log(response_msg, "response_msg");
      if (objMessage.skipUpload) return true;
      return (objMessage.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0;
    } catch (e) {}
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
  target: "//jsonplaceholder.typicode.com/posts/",
  query: {},
  headers: {
    token: "", // 需要携带token信息,看各情况具体定义
  },
  testChunks: true, //是否开启服务器分片校验,对应GET类型同名的target URL
  chunkSize: "2048000", //分块大小(单位:字节)
  fileParameterName: "upfile", //上传文件时文件内容的参数名,对应chunk里的Multipart对象名名,默认对象名为file
  maxChunkRetries: 3, //失败后最多自动重试上传次数
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
const successFileSizeText = ref<string>("");
/** 成功上传文件数量 */
const uploadedFilesCount = ref<number>(0);
/** 文件是否上传完成(包含上传中、上传完成和失败) */
const isUploading = ref<boolean | string>("");

/** 选择文件后 */
function onFileAdded() {
  showList.value = true;
}

/** 文件开始上传 */
function onUploadStart() {}

function onComplete() {
  uploadedFilesCount.value++;
  console.log("上传完成");
}

function onFileError() {
  isUploading.value = "error";
}

function onFileProgress() {
  isUploading.value = uploaderInstance.value.isUploading();
}

function onFileUploaded(data) {
  console.log("data--", data);
}

/** 关闭文件组件 */
function closeListNotification() {
  Modal.confirm({
    title: "你确定要关闭上传窗口吗？",
    icon: createVNode(ExclamationCircleOutlined),
    content: "窗口关闭后，所有未完成上传的文件将被取消上传！",
    onOk() {
      showList.value = false;
      uploadedFilesCount.value = 0;
      uploaderInstance.value.cancel();
      uploaderInstance.value.bootstrap();
      uploaderInstance.value = null;
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

watchEffect(() => {
  if (isUploading.value === "error") {
    uploaderStatusTitle.value = "有文件上传出错";
  } else if (isUploading.value === true) {
    uploaderStatusTitle.value = "文件上传中";
  } else if (isUploading.value === false) {
    uploaderStatusTitle.value = "全部上传完成";
  } else {
    uploaderStatusTitle.value = "请上传文件";
  }
  console.log("shangchuan--", uploaderInstance.value);
  successFileSizeText.value = formatBytes(
    uploaderInstance.value?.sizeUploaded()
  );
});
</script>

<template>
  <div class="uploader-notification">
    <uploader
      :options="options"
      :file-status-text="statusText"
      :autoStart="autoStart"
      class="uploader-ui"
      ref="uploaderRef"
      @complete="onComplete"
      @upload-start="onUploadStart"
      @file-added="onFileAdded"
      @file-error="onFileError"
      @file-progress="onFileProgress"
      @file-uploaded="onFileUploaded"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop v-if="props.needDrop">
        <p class="uploader-drop-text">+ 拖动文件到这里自动上传，或者</p>
      </uploader-drop>
      <uploader-btn ref="uploadFileButtonRef" :attrs="attrs"></uploader-btn>
      <uploader-btn ref="uploadFilesButtonRef" :directory="true"></uploader-btn>
      <div class="custom-template" v-if="showList">
        <a-collapse v-model:activeKey="collapseList">
          <a-collapse-panel key="open" :show-arrow="false">
            <template #header>
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
                      v-else-if="isUploading === true"
                    />
                    <CheckCircleOutlined
                      v-else-if="isUploading === false"
                      class="status-icon completed-icon"
                    />
                    <ExclamationCircleOutlined
                      v-else
                      class="status-icon info-icon"
                    />
                    <span class="upload-status-title">{{
                      uploaderStatusTitle
                    }}</span>
                  </a-space>
                </div>
                <div class="custom-template-close-icon">
                  <a-space>
                    <CloseOutlined
                      class="close-icon cursor-pointer"
                      @click.stop="closeListNotification"
                    />
                  </a-space>
                </div>
              </div>
            </template>

            <div class="custom-template-count">
              <span
                >已上传 {{ uploadedFilesCount }} 个任务，共
                {{ successFileSizeText }}</span
              >
            </div>

            <div class="custom-template-content">
              <uploader-list></uploader-list>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </uploader>
  </div>
</template>

<style lang="scss" scoped>
.uploader-notification {
  position: fixed;
  right: 24px !important;
  bottom: 24px !important;
  z-index: 1000;
  box-sizing: border-box;
  width: 500px;
  border-radius: 8px;
  box-shadow: var(--boxShadowSecondary);

  .uploader-ui {
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
      position: absolute;
      display: inline-block;
      padding: 4px 15px;
      margin: 8px 8px 0 0;
      clip: rect(0, 0, 0, 0);
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

    .custom-template {
      .custom-template-title {
        .status-icon {
          font-size: 22px;
        }

        .info-icon {
          color: var(--colorWarning);
        }

        .loading-icon {
          color: var(--colorInfo);
        }

        .completed-icon {
          color: var(--colorSuccess);
        }

        .error-icon {
          color: var(--colorError);
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
        box-sizing: border-box;
        width: 100%;
        padding: 0 16px;
        margin: 8px 0;
        background-color: var(--colorPrimaryLight);

        span {
          font-size: 12px;
          line-height: 40px;
          color: var(--colorTextSecondary);
        }
      }

      .custom-template-content {
        box-sizing: border-box;
        padding-bottom: 16px;
      }
    }
  }
}
</style>
