<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 10:40:53
 * @LastEditTime: 2023-12-29 14:07:49
 * @LastEditors: wangqiaoling
 * @Description: 典型的页面布局
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import { assign } from "lodash";
import ReContent from "./ReContent.vue";
import ReFooter from "./ReFooter.vue";
import ReHeader from "./ReHeader.vue";
import ReSider from "./ReSider.vue";
const props = defineProps({
  waterMarkModel: {
    type: Object,
    default: () => {},
  },
  needSet: {
    type: Boolean,
    default: true,
  },
});

const themeData = useThemeStore();

const layoutData: ComputedRef = computed(() => {
  return {
    name: themeData.layoutName,
    footer: themeData.hasFooter,
  };
});

let watermarkConfig = ref({
  font: {
    fontSize: 0,
  },
});
const setDefaultWatermarkConfig = () => {
  let defaultPlugins = {
    width: 120,
    height: 64,
    rotate: -22,
    zIndex: 9,
    image: "",
    content: "",
    font: {
      fontSize: 16,
      color: "",
      fontWeight: "",
      fontFamily: "",
      fontStyle: "",
    },
    gap: [100, 100] as [number, number],
    offset: [],
    visible: true,
  };
  watermarkConfig.value = assign(defaultPlugins, props.waterMarkModel);
  if (props.waterMarkModel.visible === false) {
    watermarkConfig.value.font.fontSize = 0;
  }
};

nextTick(() => {
  setDefaultWatermarkConfig();
});
</script>

<template>
  <a-watermark v-bind="watermarkConfig">
    <!-- #ifDef 
         #noSider：顶部栏布局 
         #上:header（导航菜单在顶部） 中:content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData.name === 'noSider'">
      <ReHeader :set="needSet" />
      <ReContent />
      <ReFooter v-if="layoutData.footer" />
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #mixinLeft：混合模式,sider在左边
         #上:header（可自定义辅助菜单） 中:sider/左+content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData.name === 'mixinLeft'">
      <ReHeader :set="needSet" />
      <a-layout>
        <ReSider />
        <a-layout>
          <ReContent />
          <ReFooter v-if="layoutData.footer" />
        </a-layout>
      </a-layout>
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #mixinRight：混合模式,sider在右边
         #上:header（可自定义辅助菜单） 中:sider/右+content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData.name === 'mixinRight'">
      <ReHeader :set="needSet" />
      <a-layout>
        <a-layout>
          <ReContent />
          <ReFooter v-if="layoutData.footer" />
        </a-layout>
        <ReSider />
      </a-layout>
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #custom：侧边栏布局
         #左:sider 右:header+content+footer
         #此布局的logo在sider内，已设置基础样式  -->
    <a-layout v-if="layoutData.name === 'custom'">
      <ReSider />
      <a-layout>
        <ReHeader :set="needSet" />
        <ReContent />
        <ReFooter v-if="layoutData.footer" />
      </a-layout>
    </a-layout>
    <!-- #endIf -->
  </a-watermark>
</template>
