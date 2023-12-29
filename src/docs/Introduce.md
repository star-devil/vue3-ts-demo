# 框架使用方法

## step1

1. **/src/router**: 路由文件夹
    - `index.ts`: 路由配置导出

2. **/src/router/moudles**: 路由菜单文件夹，一个菜单一个文件
    - `home.ts`: 首页

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
    - `LogoName.vue`：在这里修改系统名和logo
    - `ReFooter.vue`：在这里修改页脚显示的内容
