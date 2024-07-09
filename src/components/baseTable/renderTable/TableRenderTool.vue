<!--
 * @Author: wangqiaoling
 * @Date: 2024-06-25 10:54:31
 * @LastEditTime: 2024-06-25 11:24:53
 * @LastEditors: wangqiaoling
 * @Description: 
-->

<script setup lang="ts">
import type { UnwrapRef } from "vue";
const cellType = [
  {
    name: "文字链接",
    value: "link",
  },
  {
    name: "标签",
    value: "tags",
  },
  {
    name: "操作",
    value: "action",
  },
  {
    name: "开关",
    value: "switch",
  },
  {
    name: "段落",
    value: "paragraph",
  },
  {
    name: "徽标",
    value: "badge",
  },
  {
    name: "默认文本",
    value: undefined,
  },
];

// const extraProps = {
//     link: {

//     },
//     tags: {
//         colors:
//     }
// }

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

interface FormState {
  title: string;
  dataIndex: string;
  key: string | number;
  type: string;
  extraProps: any;
}

const tableColumns: UnwrapRef<FormState>[] = reactive([
  {
    title: "",
    dataIndex: "",
    key: "",
    type: "",
    extraProps: undefined,
  },
]);
</script>

<template>
  <a-form
    v-for="(item, index) in tableColumns"
    :key="index"
    layout="vertical"
    :model="tableColumns"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="表格标题">
      <a-input v-model:value="item.title" />
    </a-form-item>
    <a-form-item label="列数据在数据项中对应的路径">
      <a-input v-model:value="item.dataIndex" />
    </a-form-item>
    <a-form-item
      label="Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性"
    >
      <a-input v-model:value="item.key" />
    </a-form-item>
    <a-form-item label="单元格数据渲染类型">
      <a-radio-group v-model:value="item.type">
        <a-radio v-for="i in cellType" :value="i.value" :key="i.name">{{
          i.name
        }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="单元格数据渲染相关配置">
      <a-textarea v-model:value="item.extraProps" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped></style>
