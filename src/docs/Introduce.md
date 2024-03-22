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

## 关于自定义主题的样式变量获取

1. 使用之前确保你已经了解并会使用antdv4.x提供的【Design Token】主题配色方案！！
   新版本antv已经提供了很方便的动态主题切换方案，**为保持项目整体样式统一**，请尽量全部**使用框架提供的主题样式变量！！**

2. [主题在线编辑器](https://www.antdv.com/theme-editor-cn)

3. 当前主题所有变量已打印在控制台，标志为：**ccolorTokenArr**，请自行查看取用
   当前主题配色改动字段文件路径：`src/layout/theme/index.ts`，可自行修改
   非常用的样式变量可以查看[主题文档api](https://www.antdv.com/docs/vue/customize-theme-cn#api)

### 如何在ts文件中获取自定义主题内的样式变量？

1. 确定你想使用的样式变量名称
2. 找到`src/layout/theme/getTokenStore.ts`文件
3. 在文件中按照以下方法将变量导出

   ```javascript
   /** 文字悬浮背景颜色想要使用变量colorBgTextHover */
   export const textHoverBgColor = () => useThemeToken().token.colorBgTextHover;
   ```

4. 在需要使用样式的地方导入第3步定义的方法即可（注意，导入的是字符串）

### 如何在样式文件中获取自定义主题内的样式变量？

1. 确定你想使用的样式变量名称，如`colorBgLayout`。
2. 在样式文件中直接使用css语法引用变量即可，比如`var(--colorBgLayout)`

## 如何使用Iconfont?

1. 依旧是使用[阿里巴巴矢量图标库](https://www.iconfont.cn/?spm=a313x.manage_type_myprojects.i3.2.1bf93a81iCTRD5)作为补充图标。
2. 和以往相比，本项目的改为使用本地引用了。本地图标存储路径`src/assets/iconfont/index.js`
3. 本地文件内容：在线图标库项目中选择`symbol`，点击在线链接，会跳转到代码页面。全选复制，全文替换第2点中的文件内容。（注意：**请保留文件注释头**）
4. 注意：**路由（侧边菜单）**中的icon**只能**使用Iconfont。因为在新版menu兼容动态路由icon渲染的同时，要保证图标够用，这是最简单的方法。
5. 推荐Iconfont上与antdv官方图标同源图标库（相信在某些情况下你会用到，比如第4点）：
   - [twotone、outline、fill](https://www.iconfont.cn/user/detail?spm=a313x.collections_detail.i1.d9bd4f23f.40283a81xxiYj4&uid=5295564&nid=U24YmIFfC8lJ)
