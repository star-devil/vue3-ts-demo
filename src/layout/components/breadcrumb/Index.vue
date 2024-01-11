<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-11 16:54:01
 * @LastEditTime: 2024-01-11 17:50:46
 * @LastEditors: wangqiaoling
 * @Description: 面包屑组件
-->
<script setup lang="ts"></script>

<template>
  <div class="breadcrumb-comp">
    <a-breadcrumb class="re-breadcrumb">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
      <a-breadcrumb-item>An Application</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-comp {
  width: 100%;
  margin-bottom: $main-gap;
}
</style>
