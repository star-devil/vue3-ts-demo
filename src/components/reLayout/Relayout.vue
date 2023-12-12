<!--
 * @Author: wangqiaoling
 * @Date: 2023-12-08 10:40:53
 * @LastEditTime: 2023-12-12 11:24:53
 * @LastEditors: wangqiaoling
 * @Description: 典型的页面布局
-->
<script setup lang="ts">
import { useThemeStore } from "@store";
import { assign } from "lodash";
const props = defineProps({
  layoutName: {
    type: String,
    default: "custom",
  },
  waterMarkModel: {
    type: Object,
    default: () => {},
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});

const themeData = useThemeStore();

const layoutData: ComputedRef<string> = computed(() => {
  //   props.layout &&
  //     (store.state.systemStyleSet.styleSetting.layout = props.layout);
  //   return props.layout || store.state.systemStyleSet.styleSetting.layout;
  themeData.layoutName = props.layoutName;
  return props.layoutName;
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
  <a-watermark :content="['wondersgroup', 'egg']" v-bind="watermarkConfig">
    <!-- #ifDef 
         #noSider：顶部栏布局 
         #上:header（导航菜单在顶部） 中:content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData === 'noSider'">
      <ReHeader />
      <ReContent />
      <ReFooter v-if="showFooter" />
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #mixinLeft：混合模式,sider在左边
         #上:header（可自定义辅助菜单） 中:sider/左+content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData === 'mixinLeft'">
      <ReHeader />
      <a-layout>
        <ReSider />
        <ReContent />
      </a-layout>
      <ReFooter v-if="showFooter" />
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #mixinRight：混合模式,sider在右边
         #上:header（可自定义辅助菜单） 中:sider/右+content 下:footer 
         #此布局的logo在header内，已设置基础样式  -->
    <a-layout v-if="layoutData === 'mixinRight'">
      <ReHeader />
      <a-layout>
        <ReContent />
        <ReSider />
      </a-layout>
      <ReFooter v-if="showFooter" />
    </a-layout>
    <!-- #endIf -->

    <!-- #ifDef 
         #custom：侧边栏布局
         #左:sider 右:header+content+footer
         #此布局的logo在sider内，已设置基础样式  -->
    <a-layout v-if="layoutData === 'custom'">
      <ReSider />
      <a-layout>
        <ReHeader />
        <ReContent />
        <ReFooter v-if="showFooter" />
      </a-layout>
    </a-layout>
    <!-- #endIf -->
  </a-watermark>
</template>
