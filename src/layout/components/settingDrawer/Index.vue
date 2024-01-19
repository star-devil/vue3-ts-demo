<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 13:39:08
 * @LastEditTime: 2024-01-19 11:07:00
 * @LastEditors: wangqiaoling
 * @Description: 弹出的系统配置抽屉
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { theme } from "ant-design-vue";
import { useDataThemeChange } from "../../hooks/useDataThemeChange";
import { useLayout } from "../../hooks/useLayout";
import { useViewsChange } from "../../hooks/useViewsChange";
import { setToken } from "../../theme/getTokenStore"; // 当前存储的主题配置

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits<{
  (e: "close"): void;
}>();

// 系统配置抽屉
const showSetting = ref<boolean>(false);
const isLight = ref<boolean>(true);
watchEffect(() => {
  showSetting.value = props.visible;
  isLight.value = props.light;
});

const closeDrawer = () => {
  emit("close");
};

// 获取并存储当前主题
const { useToken } = theme;
const { token } = useToken();

// 存储的主题配置
const themeData = useThemeStore();
const layoutName = themeData.layoutName;

// 主题切换
const { getThemesColors, currentColor, currentColorIndex, setThemeColor } =
  useDataThemeChange();

// 布局切换
const { layoutList, layoutChange } = useLayout();

// 主题模式对应主题色数组切换
const { darkThemesColorsList, lightThemesColorsList } = getThemesColors();
let themeColorsList = ref();
watch(
  isLight,
  (newVal) => {
    themeColorsList.value = newVal
      ? lightThemesColorsList
      : darkThemesColorsList;

    nextTick(() => {
      setToken(token.value);
    });
  },
  {
    immediate: true,
  }
);
watch(currentColor, () => {
  nextTick(() => {
    setToken(token.value);
  });
});
// 界面配置
const {
  greyChange,
  settings,
  weakChange,
  headerChange,
  useLightMenu,
  footerChange,
} = useViewsChange();
</script>

<template>
  <a-drawer
    v-model:open="showSetting"
    class="custom-class"
    title="系统配置"
    placement="right"
    width="315"
    @close="closeDrawer"
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
        v-for="(item, index) in themeColorsList"
        :key="item.name"
        :style="{ background: item.color }"
        @click="setThemeColor(item.name, index)"
      >
        <CheckOutlined
          v-if="
            currentColorIndex === -1
              ? themeData.color === item.name
              : currentColorIndex === index
          "
          class="checked-icon"
        />
      </span>
    </a-space>
    <a-divider>界面配置</a-divider>
    <div class="set-box ilflex-bc">
      <a-typography-text class="box-name">灰色模式</a-typography-text>
      <a-switch
        checked-children="开"
        un-checked-children="关"
        v-model:checked="settings.greyVal"
        @change="(checked) => greyChange(checked)"
      />
    </div>
    <div class="set-box ilflex-bc">
      <a-typography-text class="box-name">色弱模式</a-typography-text>
      <a-switch
        checked-children="开"
        un-checked-children="关"
        v-model:checked="settings.weakVal"
        @change="(checked) => weakChange(checked)"
      />
    </div>
    <div class="set-box ilflex-bc">
      <a-typography-text class="box-name">混搭模式</a-typography-text>
      <a-switch
        checked-children="开"
        un-checked-children="关"
        v-model:checked="settings.headerVal"
        @change="(checked) => headerChange(checked)"
        :disabled="!isLight"
      />
    </div>
    <div
      class="set-box ilflex-bc"
      v-show="layoutName.indexOf('mix') > -1 && settings.headerVal"
    >
      <a-typography-text class="box-name">浅色侧边栏</a-typography-text>
      <a-switch
        checked-children="开"
        un-checked-children="关"
        v-model:checked="settings.lightMenuVal"
        @change="(checked) => useLightMenu(checked)"
        :disabled="!settings.headerVal"
      />
    </div>
    <div class="set-box ilflex-bc">
      <a-typography-text class="box-name">显示页脚</a-typography-text>
      <a-switch
        checked-children="开"
        un-checked-children="关"
        v-model:checked="settings.footerVal"
        @change="(checked) => footerChange(checked)"
      />
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
/** 系统配置抽屉重置 */
.custom-class {
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
    border: 1px solid rgba(28 28 28 / 5%);
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
    width: 100%;
    margin-bottom: $main-gap;
  }
}
</style>
