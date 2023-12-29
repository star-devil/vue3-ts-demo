<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:34:21
 * @LastEditTime: 2023-12-29 14:08:50
 * @LastEditors: wangqiaoling
 * @Description: Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { MenuProps, theme } from "ant-design-vue";
import { useThemeType } from "../hooks/useThemeType";
import {
  borderColorSecondary,
  setToken,
  textHoverBgColor,
} from "../theme/getTokenStore"; // 当前存储的主题配置
import LogoName from "./LogoName.vue"; // 系统名称和logo
import SettingDrawer from "./SettingDrawer.vue"; // 主题设置弹窗

defineProps({
  set: {
    type: Boolean,
    default: true,
  },
});

// 获取并存储当前主题
const { useToken } = theme;
const { token } = useToken();

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

// 存储的主题配置
const themeData = useThemeStore();
const layoutName = themeData.layoutName;

// 获取当前样式需要的变量
const borderColor = ref<string>("");
const backgroundColor = ref<string>("");

// 系统配置抽屉
const showSetting = ref<boolean>(false);
const openSetting = () => {
  showSetting.value = true;
};
const closeSetting = () => {
  showSetting.value = false;
};

// 主题模式切换
const { dataThemeChange, isLight } = useThemeType();

watch(
  isLight,
  () => {
    nextTick(() => {
      setToken(token.value);
      borderColor.value = borderColorSecondary();
      backgroundColor.value = textHoverBgColor();
    });
  },
  {
    immediate: true,
  }
);

onBeforeMount(() => {
  /* 初始化项目配置 */
  nextTick(() => {
    useThemeStore().grey &&
      document.querySelector("html")?.setAttribute("class", "html-grey");
    useThemeStore().weak &&
      document.querySelector("html")?.setAttribute("class", "html-weakness");
  });
});
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
          <div v-if="set" class="right-actions setting" @click="openSetting">
            <IconFont :type="isLight ? 'lightset' : 'darkset'" />
          </div>
        </div>
      </div>
    </div>
  </a-layout-header>
  <!-- 主题和布局配置抽屉 -->
  <SettingDrawer
    v-if="set"
    :light="isLight"
    :visible="showSetting"
    @close="closeSetting"
  />
</template>

<style lang="scss" scoped>
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
    border-bottom: 1px solid v-bind(borderColor);

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
          background: v-bind(backgroundColor);
        }
      }
    }
  }
}

/** 系统配置抽屉重置 */
.custom-class {
  .ant-drawer-body {
    padding: 5px 20px;
  }

  // 模式
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
      border: 2px solid #1677ff;
    }
  }

  // 主题色
  .colors-item {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border: 1px solid v-bind(borderColor);
    border-radius: 2px;

    .checked-icon {
      position: absolute;
      top: 2px;
      left: 2px;
      color: #fff;
      vertical-align: middle;
    }
  }

  // 界面
  .set-box {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: $main-gap;
  }
}
</style>
