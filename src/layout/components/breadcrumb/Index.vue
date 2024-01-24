<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-11 16:54:01
 * @LastEditTime: 2024-01-24 10:19:53
 * @LastEditors: wangqiaoling
 * @Description: 面包屑组件
-->
<script setup lang="ts">
import { colorText, textDescriptionColor } from "@/layout/theme/getTokenStore";
import { findRouteByPath, getParentPaths } from "@router/utils";
import { emitter } from "@utils/provideConfig";
import { sessionStorage } from "@utils/reStorage";
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
      item.path === "/" ? item.redirect : item.path,
      item.meta.title,
      item.meta.breadLink
    );
    if (item.children && item.children.length > 0) {
      breadData.children = transformRouteToBread(item.children);
    }
    return breadData;
  });
}

/** 生成面包屑数组 */
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

/**
 * @description 提供外界注册其他参数的方法
 * @param currentBreadPath 需要修改的面包屑的路由path
 * @param replaceName 替换当前的面包屑名称
 * @param prefixName 为当前面包屑增加前缀
 * @param suffixName 为当前面包屑增加后缀
 */
let breadcrumbExtraConfig = reactive({
  currentBreadPath: "",
  replaceName: "",
  prefixName: "",
  suffixName: "",
});
// 提供额外的面包屑名称
emitter.on("extraBreadcrumbName", (data: any) => {
  sessionStorage.set(data.path, data); // 保存参数到缓存中，避免刷新页面丢失
});

function getRealBreadName(breadName: string, path: string) {
  let data = sessionStorage.get(path);
  if (data) {
    breadcrumbExtraConfig.currentBreadPath = data.path;
    breadcrumbExtraConfig.replaceName = data.replace;
    breadcrumbExtraConfig.prefixName = data.prefix;
    breadcrumbExtraConfig.suffixName = data.suffix;
  }
  if (path !== breadcrumbExtraConfig.currentBreadPath) {
    return breadName;
  } else if (breadcrumbExtraConfig.replaceName) {
    return breadcrumbExtraConfig.replaceName;
  } else {
    return (
      (breadcrumbExtraConfig.prefixName || "") +
      breadName +
      (breadcrumbExtraConfig.suffixName || "")
    );
  }
}

/** 返回上一页 */
function goBackPage() {
  router.back();
}
// 重载
const onRefresh: any = inject("reload");
/** 刷新本页 */
function reloadPage() {
  onRefresh();
}

// 样式
let iconColor = ref<string>("");
let iconHoverColor = ref<string>("");
watchEffect(() => {
  iconColor.value = textDescriptionColor();
  iconHoverColor.value = colorText();
});

onBeforeUnmount(() => {
  emitter.off("extraBreadcrumbName");
});
</script>

<template>
  <div class="breadcrumb-comp">
    <a-space size="middle">
      <a-tooltip placement="top">
        <template #title>
          <span>点击可后退</span>
        </template>
        <ArrowLeftOutlined @click="goBackPage" class="handle-icon" />
      </a-tooltip>
      <a-tooltip placement="top">
        <template #title>
          <span>重新加载此页</span>
        </template>
        <ReloadOutlined @click="reloadPage" class="handle-icon" />
      </a-tooltip>

      <a-breadcrumb class="re-breadcrumb">
        <a-breadcrumb-item v-for="route in breadList" :key="route.path">
          <span
            v-if="
              breadList.indexOf(route) === breadList.length - 1 ||
              route.breadLink === false
            "
          >
            {{ getRealBreadName(route.breadcrumbName, route.path) }}
          </span>
          <router-link v-else :to="route.path">
            {{ getRealBreadName(route.breadcrumbName, route.path) }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-comp {
  width: 100%;
  margin-bottom: $main-gap;

  .handle-icon {
    color: v-bind(iconColor);
    cursor: pointer;

    &:hover {
      color: v-bind(iconHoverColor);
    }
  }
}
</style>
