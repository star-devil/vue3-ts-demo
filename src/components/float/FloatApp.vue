<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 16:08:55
 * @LastEditTime: 2023-11-09 17:35:19
 * @LastEditors: wangqiaoling
 * @Description: 全局悬浮式应用
-->
<script setup lang="ts">
// 打开关闭app
const appVisible = ref(false);
const openApp = () => {
  appVisible.value = true;
};
const closeApp = () => {
  appVisible.value = false;
};
// 选择应用
const currentAppKey = ref(1);
const chooseApp = (i: number) => {
  currentAppKey.value = i;
};
</script>

<template>
  <div class="float-app-comp">
    <div class="tools-box">
      <div v-if="appVisible" class="handle-box" @click="closeApp">
        <div class="btn-icon">
          <CloseOutlined />
          <span class="icon-tip">关闭AI助手</span>
        </div>
      </div>

      <template v-else>
        <div class="handle-box" @click="openApp">
          <div class="btn-icon">
            <MessageOutlined />
            <span class="icon-tip">AI助手</span>
          </div>
        </div>
      </template>
    </div>
    <div class="app-box" v-if="appVisible">
      <div class="insert-web-app">
        <header class="insert-header-wrap">
          <div class="header-left-box">
            <img
              class="logo-box"
              src="@/assets/images/floatApp/robotLogo.svg"
              alt="logo"
            />
            <span class="title-box">基层医疗AI智能助手</span>
          </div>
          <div class="header-right-box">
            <div class="close-btn-box">
              <CloseOutlined />
            </div>
          </div>
        </header>
        <div class="insert-chat-wrapper">
          <div class="content-box"></div>
          <div class="app-switcher-box">
            <span
              :class="[
                'app-icon-list',
                currentAppKey === i ? 'choose-app' : '',
              ]"
              v-for="i in 4"
              :key="i"
              @click="chooseApp(i)"
            >
              <img
                class="app-logo-box"
                :src="`src/assets/images/floatApp/robot_${i}.svg`"
                alt="logo"
              />
              <span class="app-tips">诊疗助手{{ i }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.float-app-comp {
  .tools-box {
    position: fixed;
    top: 500px;
    right: 10px;
    z-index: 5000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .handle-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      margin: 9px 0 0;
      line-height: 1;
      cursor: pointer;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgb(87 87 87 / 40%);

      &:hover {
        background-color: #3872e0;
        transition: background-color 0.2s ease-in-out;

        .btn-icon {
          color: #fff !important;
          transition: color 0.2s ease-in-out;
        }

        .icon-tip {
          position: absolute;
          top: 11px;
          right: 44px;
          display: inline-flex !important;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: flex-end;
          width: max-content;
          padding: 3px 5px;
          font-size: 14px;
          font-weight: 300;
          color: #fff;
          text-align: right;
          background-color: #333;
          border-radius: 5px;
        }
      }

      .btn-icon {
        font-size: 24px;
        color: #3872e0;

        .icon-tip {
          display: none;
        }
      }
    }
  }

  .app-box {
    position: fixed;
    top: 15%;
    right: 60px;
    z-index: 4999;
    width: 350px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgb(87 87 87 / 40%);

    .insert-web-app {
      z-index: 5;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-size: 14px;
      line-height: normal;
      border: unset;
      border-radius: 20px;

      .insert-header-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        min-height: 50px;
        max-height: 50px;
        padding: 0 8px 0 16px;
        user-select: none;
        border-bottom: 1px solid #f2f2f2;

        .header-left-box {
          display: flex;
          align-items: center;
          height: 40px;

          .logo-box {
            width: 40px;
            height: 40px;
            margin-top: -5px;
            margin-right: 8px;
            margin-left: -2px;
            border-radius: 4px;
          }

          .title-box {
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }
        }

        .header-right-box {
          display: flex;
          gap: 8px;
          align-items: center;
          height: 40px;
          user-select: text;

          .close-btn-box {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #838ba7;
            cursor: pointer;
            user-select: none;
            -webkit-user-drag: none;
            -webkit-tap-highlight-color: transparent;
          }
        }
      }

      .insert-chat-wrapper {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        min-height: 0;

        .content-box {
          position: relative;
          flex: 1;
          min-width: 0;
          height: 100%;
        }

        .app-switcher-box {
          position: relative;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          width: 44px;
          height: 100%;
          padding: 10px 0;
          background: #f8fcff;
          border-left: 0.5px solid #919eab29;

          .app-icon-list {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            cursor: pointer;
            user-select: none;
            background-color: transparent;
            -webkit-user-drag: none;
            -webkit-tap-highlight-color: transparent;

            &:hover {
              .app-tips {
                position: absolute;
                top: 10px;
                right: 44px;
                display: inline-flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-end;
                width: max-content;
                padding: 3px 5px;
                font-size: 14px;
                font-weight: 400;
                color: #fff;
                text-align: right;
                background-color: rgba($color: #000, $alpha: 80%);
                border-radius: 5px;
              }
            }

            .app-logo-box {
              width: 32px;
              height: 32px;
              border-radius: 32px;
            }

            .app-tips {
              display: none;
              box-shadow:
                0 6px 16px 0 rgb(0 0 0 / 8%),
                0 3px 6px -4px rgb(0 0 0 / 12%),
                0 9px 28px 8px rgb(0 0 0 / 5%);

              &::before {
                position: absolute;
                top: 7px;
                right: -11px;
                content: "";
                border-color: transparent transparent transparent
                  rgba($color: #000, $alpha: 80%);
                border-style: solid;
                border-width: 6px;
              }
            }
          }

          .choose-app {
            background-color: #e0f1ff;
          }
        }
      }
    }
  }
}
</style>
