<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-04 16:59:20
 * @LastEditTime: 2024-03-22 14:04:08
 * @LastEditors: wangqiaoling
 * @Description: 通过CSS变量同步ant-design组件与自定义组件的样式,包裹所有需要同步样式的DOM元素;核心逻辑：是渲染传入其中的children，并运行一个自定义hook-useCssVariables。
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import useCssVariables from "./hooks/useCssVariables";

const props = defineProps({
  isGlobal: {
    type: Boolean,
    default: false,
  },
});
const { setCssVariables, clearCssVariables, state } = useCssVariables(
  props.isGlobal
);
const containerRef = ref(null);
const styleEleId = computed(() => {
  return props.isGlobal
    ? "style-is-global"
    : `style-${state.cssVarContainerID}`;
});

const themes = useThemeStore();

watchEffect(() => {
  if (themes.themeType) setCssVariables(styleEleId.value);
});

onMounted(() => {
  if (!props.isGlobal && containerRef.value) {
    containerRef.value.id = state.cssVarContainerID;
  }
  setCssVariables(styleEleId.value); // 在组件挂载时设置CSS变量
});

onBeforeUnmount(() => {
  clearCssVariables(); // 在组件销毁前清除CSS变量
});
</script>

<template>
  <div v-if="!isGlobal" :id="state.cssVarContainerID" ref="containerRef">
    <slot></slot>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>
