<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:34:21
 * @LastEditTime: 2023-12-12 13:58:49
 * @LastEditors: wangqiaoling
 * @Description: Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store";
import { MenuProps } from "ant-design-vue";
const current = ref<string[]>(["mail"]);
const items = ref<MenuProps["items"]>([
  {
    key: "mail",
    label: "Navigation One",
    title: "Navigation One",
  },
  {
    key: "app",
    label: "Navigation Two",
    title: "Navigation Two",
  },
  {
    key: "sub1",
    label: "Navigation Three - Submenu",
    title: "Navigation Three - Submenu",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: h(
      "a",
      { href: "https://antdv.com", target: "_blank" },
      "Navigation Four - Link"
    ),
    title: "Navigation Four - Link",
  },
]);

const themeData = useThemeStore();
const layoutName = themeData.layoutName;
</script>

<template>
  <a-layout-header>
    <div
      :class="[
        layoutName === 'noSider' ? 'fix-header' : 'right-header',
        're-header',
      ]"
    >
      <div class="horizontal-header">
        <div class="horizontal-header-left" v-if="layoutName !== 'custom'">
          <img
            class="layout-system-logo"
            src="https://next.antdv.com/assets/logo.1ef800a8.svg"
            alt="logo"
          />
          <span class="layout-system-name">Vue3Ts自定义框架</span>
        </div>
        <div class="horizontal-header-menu">
          <a-menu
            v-if="layoutName === 'noSider'"
            v-model:selectedKeys="current"
            mode="horizontal"
            :items="items"
          />
        </div>
        <div class="horizontal-header-right">
          <div class="right-actions user-info">
            <a-space>
              <a-avatar style="color: #f56a00; background-color: #fde3cf"
                >U</a-avatar
              >
              <span>admin</span>
            </a-space>
          </div>
          <div class="right-actions setting">
            <SettingOutlined />
          </div>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
// .right-header {
// }

.fix-header {
  position: fixed;
  top: 0;
  right: 0;
}

.re-header {
  z-index: 998;
  width: 100%;

  .horizontal-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 48px;
    background: #fff;

    .horizontal-header-left {
      display: flex;
      align-items: center;
      width: auto;
      min-width: 300px;
      height: 100%;
      padding-left: 10px;
      cursor: pointer;
    }

    .horizontal-header-menu {
      flex: 1;
      align-items: center;
      min-width: 0;
    }

    .horizontal-header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 340px;

      .right-actions {
        padding: 0 10px;
        cursor: pointer;

        &:hover {
          background: #f6f6f6;
        }
      }
    }
  }
}
</style>
