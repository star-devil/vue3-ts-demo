<script setup lang="ts">
import type { Rule } from "ant-design-vue/es/form";
import type { UnwrapRef } from "vue";

const cellType = [
  {
    name: "默认文本",
    value: undefined,
  },
  {
    name: "文字链接",
    value: "link",
  },
  {
    name: "标签",
    value: "tags",
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
    name: "操作",
    value: "action",
  },
];

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
const tableCol = {
  title: "",
  dataIndex: "",
  key: "",
  type: "",
  extraProps: undefined,
};

// 生成表格列
const formRefs = ref([]);

const tableColumnNum = ref(1);

// 监听tableColumnNum，如果增加，则往tableColumns加入一个tableCol，如果减少，则减去最后一个tableCol
watch(tableColumnNum, () => {
  if (tableColumnNum.value > tableColumns.length) {
    tableColumns.push({ ...tableCol });
  } else if (tableColumnNum.value < tableColumns.length) {
    tableColumns.pop();
    formRefs.value.pop();
  }
});

const tableColumnTabactiveKey = ref("table_1");
const rulesRef: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: "必须输入列标题",
    },
  ],
  dataIndex: [
    {
      required: true,
      message: "必须输入列数据在数据项中对应的路径",
    },
  ],
};

const onSubmit = (i: number) => {
  formRefs.value[i]
    .validate()
    .then(() => {
      console.log(toRaw(tableColumns));
    })
    .catch((err: any) => {
      console.log("error", err);
    });
};

const resetForm = (i: number) => {
  formRefs.value[i].resetFields();
};
</script>

<template>
  <div class="inline-flex items-center">
    <span>需要生成 </span>
    <a-input-number v-model:value="tableColumnNum" :min="1" :max="20" />
    <span> 列的表格</span>
  </div>
  <a-tabs v-model:activeKey="tableColumnTabactiveKey">
    <a-tab-pane
      :key="'table_' + i"
      :tab="'第' + i + '列'"
      v-for="i in tableColumnNum"
    >
      <a-form
        :rules="rulesRef"
        layout="vertical"
        :model="tableColumns[i - 1]"
        :ref="(el: any) => (formRefs[i] = el)"
      >
        <a-form-item label="表格列标题" name="title">
          <a-input v-model:value="tableColumns[i - 1].title" />
        </a-form-item>
        <a-form-item label="列数据在数据项中对应的路径" name="dataIndex">
          <a-input v-model:value="tableColumns[i - 1].dataIndex" />
        </a-form-item>
        <a-form-item
          label="Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性"
          name="key"
        >
          <a-input v-model:value="tableColumns[i - 1].key" />
        </a-form-item>
        <a-form-item label="单元格数据渲染类型" name="type">
          <a-radio-group v-model:value="tableColumns[i - 1].type">
            <a-radio v-for="t in cellType" :value="t.value" :key="t.name">{{
              t.name
            }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="单元格数据渲染相关配置" name="extraProps">
          <a-textarea v-model:value="tableColumns[i - 1].extraProps" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click.prevent="onSubmit(i)"
            >创建第 {{ i }} 列</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm(i)"
            >重置</a-button
          >
        </a-form-item>
      </a-form></a-tab-pane
    >
  </a-tabs>

  <base-table v-if="tableColumns.length" :columns="tableColumns"></base-table>
</template>
