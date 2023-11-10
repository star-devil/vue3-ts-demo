<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:07:42
 * @LastEditTime: 2023-11-10 13:24:15
 * @LastEditors: wangqiaoling
 * @Description: 聊天组件
-->
<script setup lang="ts">
import { getContainer } from "@/utils/provideConfig";
</script>

<template>
  <div class="chat-wrap">
    <span class="bot-dialog-root"></span>
    <div class="chat-box">
      <div class="chat-box-dragger">
        <div class="wrapper"></div>
        <div class="chat-input-panel">
          <div class="toolbar-box">
            <a-space warp>
              <a-tooltip
                title="新对话"
                :getPopupContainer="(trigger) => getContainer(trigger)"
              >
                <a-button type="primary" shape="circle" size="small">
                  <template #icon>
                    <ClearOutlined />
                  </template>
                </a-button>
              </a-tooltip>
              <div class="action-box">
                <a-space warp>
                  <span class="tool-icon">
                    <BookOutlined />
                  </span>
                  <span class="tool-name"> 指南查询 </span>
                </a-space>
              </div>
              <div class="action-box">
                <a-space warp>
                  <span class="tool-icon">
                    <FieldTimeOutlined />
                  </span>
                  <span class="tool-name"> 历史对话 </span>
                </a-space>
              </div>
            </a-space>
          </div>
          <div class="input-box">
            <div class="input-container">
              <a-textarea
                :bordered="false"
                placeholder="请输入您的诊疗问题"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </div>
            <div class="input-toolbar">
              <div class="input-actions"></div>
              <a-tooltip
                title="发送(↵)"
                :getPopupContainer="(trigger) => getContainer(trigger)"
              >
                <div class="input-message-btn">
                  <svg
                    class="icon-zzgNjO"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 18 18"
                    style="min-width: 18px; min-height: 18px"
                  >
                    <g>
                      <path
                        fill="currentColor
                "
                        d="M15.71 8.019 3.835 1.368a1.125 1.125 0 0 0-1.61 1.36l2.04 5.71h5.298a.562.562 0 1 1 0 1.125H4.264l-2.04 5.71a1.128 1.128 0 0 0 1.058 1.506c.194 0 .384-.05.552-.146l11.877-6.65a1.125 1.125 0 0 0 0-1.964Z"
                        data-follow-fill="#A9B3C5"
                      ></path>
                    </g>
                  </svg>
                </div>
              </a-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  padding: 0;
  text-align: left;

  .bot-dialog-root {
    z-index: 4999;
  }

  .chat-box {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .chat-box-dragger {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
      min-height: 0;

      .wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-content: space-between;
        width: 100%;
        min-height: 0;
        overflow: hidden auto;
        overscroll-behavior: contain;
      }

      .chat-input-panel {
        position: relative;
        z-index: 501;
        display: block;
        width: 100%;
        padding: 10px 16px 16px;
        background: #f4f5f7;
        border-top: 1px solid #f5f5f5;

        .toolbar-box {
          position: relative;
          display: flex;
          align-items: center;
          height: 28px;
          margin-bottom: 8px;

          .action-box {
            display: inline-flex;
            align-items: center;
            height: 28px;
            padding: 0 8px;
            color: #586875;
            cursor: pointer;
            background: #fff;
            border-radius: 14px;

            &:hover {
              color: #3872e0;
            }

            .tool-icon,
            .tool-name {
              font-size: 12px;
            }
          }
        }

        .input-box {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 8px;
          background: white;
          border-radius: 8px;

          .input-container {
            display: flex;
            flex: 1;
            margin-bottom: 5px;
          }

          .input-toolbar {
            display: flex;
            height: 20px;
            user-select: none;

            .input-actions {
              flex: 1;
            }

            .input-message-btn {
              position: relative;
              top: -4px;
              right: -6px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              font-size: 18px;
              color: #9faabc;
              cursor: pointer;
              border-radius: 15px;

              &:hover {
                background: #e7e7e9;
              }
            }
          }
        }
      }
    }
  }
}
</style>
