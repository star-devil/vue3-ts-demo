<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:34:21
 * @LastEditTime: 2023-12-26 16:27:28
 * @LastEditors: wangqiaoling
 * @Description: Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { MenuProps } from "ant-design-vue";
import { useDataThemeChange } from "../hooks/useDataThemeChange";
import { useLayout } from "../hooks/useLayout";
import LogoName from "./LogoName.vue";
// 获取当前主题
// const { useToken } = theme;
// const { token } = useToken();
// console.log("token--", token.value);
// 临时菜单
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

// 系统配置抽屉
const showSetting = ref<boolean>(false);

// 主题切换
const { dataThemeChange, isLight, getThemesColors, setThemeColor } =
  useDataThemeChange();

// 布局切换
const { layoutList, layoutChange } = useLayout();

// 主题颜色切换
const { darkThemesColorsList, lightThemesColorsList } = getThemesColors();
const themeColorsList = isLight ? lightThemesColorsList : darkThemesColorsList;
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
          <LogoName />
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
            <a-dropdown :trigger="['click']" :arrow="true">
              <a-space>
                <a-avatar style="color: #f56a00; background-color: #fde3cf"
                  >N
                </a-avatar>
                <span>admin</span>
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="loginout">
                    <LogoutOutlined />
                    退出系统
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div class="right-actions theme-type" @click="dataThemeChange">
            <IconFont :type="isLight ? 'light' : 'dark'" />
          </div>
          <div class="right-actions setting" @click="showSetting = true">
            <IconFont :type="isLight ? 'lightset' : 'darkset'" />
          </div>
        </div>
      </div>
    </div>
  </a-layout-header>
  <!-- 主题和布局配置抽屉 -->
  <a-drawer
    v-model:open="showSetting"
    class="custom-class"
    title="系统配置"
    placement="right"
    width="315"
  >
    <a-divider>导航模式</a-divider>
    <a-space class="layout-wrap">
      <a-tooltip
        v-for="(name, key) in layoutList"
        :key="key"
        :title="name"
        placement="bottom"
      >
        <span
          :class="['layout-mode', key === layoutName ? 'is-select' : '']"
          @click="layoutChange(key)"
        >
          <div :class="key + '-mode-1'"></div>
          <div :class="key + '-mode-2'"></div>
        </span>
      </a-tooltip>
    </a-space>
    <a-divider>主题色</a-divider>
    <a-space>
      <span
        class="colors-item"
        v-for="item in themeColorsList"
        :key="item.name"
        :style="{ background: item.color }"
        @click="setThemeColor(item.name)"
      ></span>
    </a-space>
  </a-drawer>
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
    border-bottom: 1px solid $border-color;

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
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background: #f6f6f6;
        }
      }
    }
  }
}
</style>
<style lang="scss">
/** 系统配置抽屉重置 */
.custom-class {
  .ant-drawer-body {
    padding: 5px 20px;
  }

  .layout-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    margin-top: 25px;

    .layout-mode {
      position: relative;
      display: inline-block;
      width: 55px;
      height: 45px;
      overflow: hidden;
      cursor: pointer;
      background: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px #0000002e;

      .noSider-mode-1 {
        width: 100%;
        height: 30%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }

      .mixinLeft-mode-1 {
        width: 100%;
        height: 30%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }

      .mixinLeft-mode-2 {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30%;
        height: 70%;
        background: #fff;
        box-shadow: 0 0 1px #888;
      }

      .mixinRight-mode-1 {
        width: 100%;
        height: 30%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }

      .mixinRight-mode-2 {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30%;
        height: 70%;
        background: #fff;
        box-shadow: 0 0 1px #888;
      }

      .custom-mode-1 {
        width: 30%;
        height: 100%;
        background: #1b2a47;
      }

      .custom-mode-2 {
        position: absolute;
        top: 0;
        right: 0;
        width: 70%;
        height: 30%;
        background: #fff;
        box-shadow: 0 0 1px #888;
      }
    }

    .is-select {
      border: 2px solid #722ed1;
    }
  }

  .colors-item {
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border: 1px solid $border-color;
    border-radius: 2px;
  }
}
</style>
