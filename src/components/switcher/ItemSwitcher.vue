<script setup lang="ts">
import { useSwitch } from "./index.ts";
const { currentAppKey, chooseApp } = useSwitch();
</script>

<template>
  <div class="app-switcher-box">
    <span
      :class="['app-icon-list', currentAppKey === i ? 'choose-app' : '']"
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
</template>

<style lang="scss" scoped>
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
</style>
