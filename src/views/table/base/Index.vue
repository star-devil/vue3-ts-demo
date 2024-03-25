<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-03-25 15:36:20
 * @LastEditors: wangqiaoling
 * @Description: 
-->
<script setup lang="ts">
import type { eColumnsType } from "@c/baseTable/type";
import { emitter } from "@utils/provideConfig";
import { useRouter } from "vue-router";

const router = useRouter();

function goDetail() {
  router.push("/table/base-table/detail");

  emitter.emit("extraBreadcrumbName", {
    path: "/table/base-table/detail",
    suffix: "-这是我的后缀",
  });
}
// 表格数据
const columns: eColumnsType = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    type: "link",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    type: "tags",
  },
  {
    title: "Action",
    type: "action",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
</script>

<template>
  <div class="content-wrap">
    <a-button type="primary" @click="goDetail">Go detail</a-button>
    <base-table :columns="columns" :data="data"></base-table>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  background-color: var(--colorPrimaryLight);
}
</style>
