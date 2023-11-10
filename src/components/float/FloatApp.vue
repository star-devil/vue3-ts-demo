<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-09 16:08:55
 * @LastEditTime: 2023-11-10 15:02:47
 * @LastEditors: wangqiaoling
 * @Description: 全局悬浮式应用
-->
<script setup lang="ts">
import { useHandle } from "./useBaseHandle";
import { useTabs } from "./useTabs";
const { appVisible, openApp, closeApp } = useHandle();
const { current, items, changeMenu } = useTabs();
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
              src="@assets/images/floatApp/robotLogo.svg"
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
        <div class="insert-tabs-wrap">
          <a-menu
            v-model:selectedKeys="current"
            mode="horizontal"
            :items="items"
            @click="changeMenu"
          />
        </div>
        <div class="insert-chat-wrap">
          <router-view />
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

      .insert-tabs-wrap {
        position: relative;
        z-index: 200;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 39px;
        min-height: 39px;
        background: #fff;
        box-shadow: 0 4px 4px -2px #0000000d;

        :where(.css-dev-only-do-not-override-185kyl0).ant-menu-light {
          background: unset;
        }

        :where(.css-dev-only-do-not-override-185kyl0).ant-menu-horizontal {
          line-height: 39px;
          border-bottom: unset;
        }
      }

      .insert-chat-wrap {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        min-height: 0;
      }
    }
  }
}
</style>
