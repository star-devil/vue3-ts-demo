<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:18:37
 * @LastEditTime: 2023-11-10 18:01:44
 * @LastEditors: wangqiaoling
 * @Description: 侧边选项切换
-->
<script setup lang="ts">
import { getContainer } from "@utils/provideConfig.ts";
import { ListItem } from "./data";
import { useSwitch } from "./index.ts";

const { getIcon, currentAppKey, chooseApp } = useSwitch();
// 项目数据
const props = defineProps({
  itemData: {
    type: Object as PropType<ListItem[]>,
    default: () => {},
  },
});
</script>

<template>
  <div class="app-switcher-box">
    <a-tooltip
      v-for="(item, index) in props.itemData"
      :key="`listItem_` + index"
      :title="item.show_type"
      placement="left"
      :getPopupContainer="(trigger) => getContainer(trigger)"
    >
      <span
        :class="[
          'app-icon-list',
          currentAppKey === item.show_type ? 'choose-app' : '',
        ]"
        @click="chooseApp(item.show_type)"
      >
        <img
          class="app-logo-box"
          :src="`src/assets/images/floatApp/${getIcon(item.show_type)}.svg`"
          alt="logo"
        />
      </span>
    </a-tooltip>
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

    .app-logo-box {
      width: 32px;
      height: 32px;
      border-radius: 32px;
    }
  }

  .choose-app {
    background-color: #e0f1ff;
  }
}
</style>
