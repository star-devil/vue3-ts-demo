<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-07-11 13:21:55
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import { emitter } from "@utils/provideConfig";
import { useRouter } from "vue-router";
import {
  baseTableColumns,
  baseTableData,
  getData,
  paginationInfo,
  tableLoading,
} from "./data"; // 表格数据

const router = useRouter();

function goDetail() {
  router.push("/table/base-table/detail");

  emitter.emit("extraBreadcrumbName", {
    path: "/table/base-table/detail",
    suffix: "-这是我的后缀",
  });
}
onMounted(() => {
  getData();
});
</script>

<template>
  <div>
    <div class="content-wrap">
      <a-button type="primary" @click="goDetail">Go detail</a-button>
      <base-table
        :columns="baseTableColumns"
        :dataSource="baseTableData"
        :loading="tableLoading"
        :pagination="paginationInfo"
      ></base-table>
    </div>
  </div>
</template>
