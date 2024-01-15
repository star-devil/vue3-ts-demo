<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-11 16:54:01
 * @LastEditTime: 2024-01-15 15:41:53
 * @LastEditors: wangqiaoling
 * @Description: 面包屑组件
-->
<script setup lang="ts">
import { findRouteByPath, getParentPaths } from "@router/utils";
import { RouteComponent } from "vue-router";

declare namespace ANTD {
  type Route = import("ant-design-vue/lib/breadcrumb/Breadcrumb").Route;
}
/** 面包屑项类型 */
interface BreadRoute extends ANTD.Route {
  breadLink?: boolean;
}

const routeInfo = useRoute();
const router = useRouter();
const routes: any = router.options.routes;

const breadList = ref<BreadRoute[]>([]);
onBeforeMount(() => {
  breadRouteList();
  console.log(routeInfo);
});

watch(
  () => routeInfo,
  () => {
    breadRouteList();
  },
  { deep: true, immediate: true }
);

// 处理菜单成menu需要的格式
/**
 * @description 转换对象结构
 */
function getItem(
  path: string,
  breadcrumbName: string,
  breadLink: boolean,
  children?: BreadRoute[]
): BreadRoute {
  return {
    path,
    breadcrumbName,
    breadLink,
    children,
  } as BreadRoute;
}
/**
 * @description 将路由转变为面包屑
 * @param route 当前的路由
 */
function transformRouteToBread(route: RouteComponent[]): BreadRoute[] {
  return route.map((item: any) => {
    const breadData: BreadRoute = getItem(
      item.redirect || item.path,
      item.meta.title,
      item.meta.breadLink
    );
    if (item.children && item.children.length > 0) {
      breadData.children = transformRouteToBread(item.children);
    }
    return breadData;
  });
}

function breadRouteList() {
  // 当前路由信息
  const currentRoute = findRouteByPath(router.currentRoute.value.path, routes);
  // 当前路由的父级路径组成的数组
  const parentRoutes = getParentPaths(
    router.currentRoute.value.name as string,
    routes,
    "name"
  );

  // 存放组成面包屑的数组
  const matched: any[] = [];

  // 获取每个父级路径对应的路由信息
  parentRoutes.forEach((path) => {
    if (path !== "/") matched.push(findRouteByPath(path, routes));
  });

  matched.push(currentRoute);

  matched.forEach((item, index) => {
    if (currentRoute?.query || currentRoute?.params) return;
    if (item?.children) {
      item.children.forEach((v: any) => {
        if (v?.meta?.title === item?.meta?.title) {
          matched.splice(index, 1);
        }
      });
    }
  });

  const matchedData = matched.filter(
    (item) => item?.meta && item?.meta.title !== false
  );

  breadList.value = transformRouteToBread(matchedData);
}
/** 返回上一级 */
function goBack() {
  router.back();
}
</script>

<template>
  <div class="breadcrumb-comp">
    <a-breadcrumb class="re-breadcrumb">
      <a-breadcrumb-item v-for="route in breadList" :key="route.path">
        <span
          v-if="
            breadList.indexOf(route) === breadList.length - 1 ||
            route.breadLink === false
          "
        >
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="route.path">
          {{ route.breadcrumbName }}
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header
      v-if="breadList.length > 2"
      :title="routeInfo.meta.title"
      sub-title="This is a subtitle"
      @back="goBack"
    />
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-comp {
  width: 100%;
  margin-bottom: $main-gap;
}
</style>
