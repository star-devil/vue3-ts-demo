# 框架使用方法

**！！在下文中未提及到的文件内容，不要随意修改！！**

## step1

1. **/src/router**: 路由文件夹

   - `index.ts`: 路由配置导出

2. **/src/router/moudles**: 路由菜单文件夹，一个菜单一个文件
   - 只有将菜单写在这个文件夹下，才会生成路由表和导航菜单
   - `home.ts`: 首页，展示布局结构的入口，且永远排在菜单第一项，不可删除
   - `remaining.ts`: 其他无需layout的页面，即不展示菜单导航，只需要展示业务内容模块
   - 整体路由表配置请查看`RouteConfigsTable`接口
   - 文件`/types/router.d.ts`中对路由表字段有详细说明，包括`RouteConfigsTable`接口

## step2

1. **/src/App.vue**: 单页面入口文件，需要设置主题配置，否则将使用默认配置
   - 配置方法：`themes.setTheme("noSider", false, "light", "black", 60 * 24 * 7);`
   - 参数说明：鼠标悬浮在`setTheme`方法上即可浏览

## step3

1. **/src/layout/Index.vue**: 整体布局框架页面，配置水印、是否渲染系统配置

   - 配置水印：`waterMarkModel`
     - `content`：水印内容
     - `fontSize`： 水印字体大小
     - 更多参数请看：[水印 watermark](https://www.antdv.com/components/watermark-cn)
   - 是否渲染系统配置：`needSet`
     - `true`：页头展示设置按钮，点击出现配置抽屉
     - `false`：不展示

2. **/src/layout/components**: 布局结构中用到的所有组件
   - `/logoName/Index.vue`：在这里修改系统名和logo
   - `ReFooter.vue`：在这里修改页脚显示的内容

## step4

1. `/.env.dev`、`/.env.pro`、`/.env.test`: 环境变量配置文件
   - 灰色模式、是否渲染系统配置放在环境变量中，可在构建时直接配置
   - 目前文件中4个变量均在代码中使用，如要删除，请修改对应代码！！
   - 其余参数请自行斟酌添加

## 关于封装组件的额外说明

### 面包屑`/src/layout/components/breadcrumb/Index.vue`

1. 该面包屑是对`antdv-breadcrumb`的二次封装，主要增加了以下几点功能

   - 根据当前页面动态更新面包屑
   - 增加了页面回退和刷新当前页（非整个浏览器刷新）的功能
   - ⭐️ **增加了面包屑参数**，该参数包括面包屑重命名和其他自定义参数，页面刷新后也会保留，浏览器窗口关闭后失效

     > 调用姿势：在合适的时机调用eventbus的**extraBreadcrumbName**方法
     > `emitter.emit("extraBreadcrumbName", {相关参数});`
     >
     > 设计思路：通过调用方法，将传入的参数保存在sessionstorage中
     >
     > 参数说明：
     > `path`: **必传**，作为唯一key值标识，值为**需要接收参数的路由path** > `replace`: 可选，替换当前的面包屑名称
     > `prefix`: 可选，为当前面包屑增加前缀
     > `suffix`: 可选，为当前面包屑增加后缀
     > 以上几个参数在面包屑组件中已完成逻辑处理
     > `其他`: 可选，你可以将其余必要参数都通过这个方法传入并保存到sessionstorage中，以便在需要时使用
