<script lang="ts" setup>
import { SmileOutlined } from "@ant-design/icons-vue";
import { disposeColumns } from "./renderComponents";

const paginationProps = defineProps(["pagination"]);

const paginationObj = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: ["10", "20", "50", "100"],
  responsive: true,
  showSizeChanger: true,
  showLessItems: true,
  showTotal: (total: number, range: number[]) =>
    `第${range[0]}~${range[1]}项，共${total} 条数据`,
  onChange: (page: number, pageSize: number) => {
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    paginationProps.pagination.change(page, pageSize);
  },
});

const hasPagination = computed(() => {
  return !!paginationProps.pagination;
});

watchEffect(() => {
  if (paginationProps.pagination) {
    Object.assign(paginationObj, paginationProps.pagination);
  }
});
</script>
<template>
  <a-table v-bind="$attrs" :pagination="hasPagination && paginationObj">
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
        :data="{ column, record, text }"
      />
    </template>
  </a-table>
</template>
