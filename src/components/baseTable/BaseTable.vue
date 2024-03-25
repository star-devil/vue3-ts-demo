<!--
 * @Author: wangqiaoling
 * @Date: 2024-03-22 16:08:49
 * @LastEditTime: 2024-03-25 15:35:49
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script lang="ts" setup>
import { SmileOutlined } from "@ant-design/icons-vue";
import { disposeColumns } from "./renderComponents";
import type { eColumnsType } from "./type";

defineProps({
  columns: {
    type: Array as () => eColumnsType,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record, text }">
      <body-cell
        :columnType="disposeColumns(column)"
        :record="record"
        :text="text"
      />
    </template>
  </a-table>
</template>
