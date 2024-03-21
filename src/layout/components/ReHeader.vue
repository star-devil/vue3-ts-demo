<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:34:21
 * @LastEditTime: 2024-03-21 13:29:10
 * @LastEditors: wangqiaoling
 * @Description: Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting"; // 系统主题
import { useUserInfo } from "@store/modules/userInfo"; // 登录用户信息
import { theme } from "ant-design-vue";
import LogoName from "../components/logoName/Index.vue"; // 系统名称和logo
import { useThemeType } from "../hooks/useThemeType";
import {
  borderColorSecondary,
  setToken,
  textHoverBgColor,
} from "../theme/getTokenStore"; // 当前存储的主题配置
import { logoutSystem } from "../utils/logInAndOut";
import ReBreadcrumb from "./breadcrumb/Index.vue"; // 面包屑
import NavigationMenu from "./navigationMenu/Index.vue"; // 导航菜单
import SettingDrawer from "./settingDrawer/Index.vue"; // 主题设置弹窗

defineProps({
  set: {
    type: Boolean,
    default: true,
  },
});

// 获取当前登录用户名
const userInfo = useUserInfo();

// 获取并存储当前主题
const { useToken } = theme;
const { token } = useToken();

// 存储的主题配置
const layoutData = computed(() => {
  return {
    name: useThemeStore().layoutName,
    headColor: useThemeStore().headColor,
    type: useThemeStore().type,
  };
});

// 混搭模式下的样式切换
const headerIconType = computed(() => {
  if (layoutData.value.name !== "custom") {
    return isLight.value && !layoutData.value.headColor;
  } else {
    return isLight.value;
  }
});
const changHeaderStyle = computed(() => {
  let style = {};
  if (layoutData.value.type === "light" && layoutData.value.name !== "custom") {
    if (layoutData.value.headColor) {
      style = {
        backgroundColor: "#001529",
        color: "#fff",
      };
    } else {
      style = { backgroundColor: "unset" };
    }
  }
  return style;
});

// 获取当前样式需要的变量
const borderColor = computed(() => {
  if (layoutData.value.type === "light" && layoutData.value.name !== "custom") {
    if (layoutData.value.headColor) {
      return "rgb(39,39,39)";
    } else {
      return borderColorSecondary();
    }
  } else {
    return borderColorSecondary();
  }
});
const btnHoverBgColor = computed(() => {
  if (layoutData.value.type === "light" && layoutData.value.name !== "custom") {
    if (layoutData.value.headColor) {
      return "rgba(255,255,255,.3)";
    } else {
      return textHoverBgColor();
    }
  } else {
    return textHoverBgColor();
  }
});

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
        layoutData.name === 'noSider'
          ? 'fix-header'
          : layoutData.name === 'custom'
          ? 'right-header'
          : 'top-header',
        're-header',
      ]"
      :style="changHeaderStyle"
    >
      <div class="horizontal-header">
        <div class="horizontal-header-left" v-if="layoutData.name !== 'custom'">
          <LogoName />
        </div>
        <ReBreadcrumb v-if="layoutData.name === 'custom'" />
        <div class="horizontal-header-menu">
          <NavigationMenu v-if="layoutData.name === 'noSider'" />
        </div>
        <div class="horizontal-header-right">
          <div class="right-actions user-info">
            <a-dropdown :trigger="['click']" :arrow="true">
              <a-space>
                <a-avatar style="color: #f56a00; background-color: #fde3cf"
                  >{{ userInfo.userName.slice(-1) }}
                </a-avatar>
                <span>{{ userInfo.userName }}</span>
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="logout">
                    <a-space @click="logoutSystem">
                      <LogoutOutlined />
                      退出系统
                    </a-space>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div class="right-actions theme-type" @click="dataThemeChange">
            <IconFont :type="headerIconType ? 'light' : 'dark'" />
          </div>
          <div v-if="set" class="right-actions setting" @click="openSetting">
            <IconFont :type="headerIconType ? 'lightset' : 'darkset'" />
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
          background: v-bind(btnHoverBgColor);
        }
      }
    }

    .breadcrumb-comp {
      padding: 0 $main-gap;
      margin-bottom: 0;
    }
  }
}
</style>
