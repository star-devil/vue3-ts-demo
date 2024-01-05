<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:34:21
 * @LastEditTime: 2024-01-04 17:15:47
 * @LastEditors: wangqiaoling
 * @Description: Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { theme } from "ant-design-vue";
import LogoName from "../components/logoName/Index.vue"; // 系统名称和logo
import { useThemeType } from "../hooks/useThemeType";
import {
  borderColorSecondary,
  setToken,
  textHoverBgColor,
} from "../theme/getTokenStore"; // 当前存储的主题配置
import NavigationMenu from "./navigationMenu/Index.vue"; // 导航菜单
import SettingDrawer from "./settingDrawer/Index.vue"; // 主题设置弹窗

defineProps({
  set: {
    type: Boolean,
    default: true,
  },
});

// 获取并存储当前主题
const { useToken } = theme;
const { token } = useToken();

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
          <NavigationMenu v-if="layoutName === 'noSider'" />
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
</style>
