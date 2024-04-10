# Vue 3 + TypeScript + Vite + pnpm + scss

## 使用前请认真阅读本文档

1. 该项目在初始vue代码框架上，添加了antdvUI框架
2. 请严格按照`vue3`和`typescript`语法编写代码
3. 包管理器请使用`pnpm`，其他包命令会报错
4. 构建工具使用`vite 4.x`
5. 样式处理器使用的`scss`
6. http请求处理器使用的是`axios``1.x`版本，这个版本较`0.x`版本有较大改动，使用时若出现报错请仔细阅读官方文档

## 启动运行

1. `pnpm install`
2. 本地和开发环境：`pnpm dev` / `pnpm serve`
3. 测试环境：`pnpm dev:test`
4. 生成或正式环境：`pnpm dev:pro`

## 打包

1. 本地和开发环境：`pnpm build` / `pnpm build:dev`
2. 测试环境：`pnpm build:test`
3. 生成或正式环境：`pnpm build:pro`

## 环境变量文件

1. 本地和开发环境：`.env.dev`
2. 测试环境：`.env.test`
3. 生成或正式环境：`.env.pro`

## 建议使用的编辑器和相关插件

- VS Code
- Vue - Official
- Eslint
- ... 以及安装所有推荐插件，在插件库中的漏斗下选择[推荐]全部安装

## 提交前手动格式化代码

- 如果有格式错误无法自动修复或者提交代码时提示有格式错误，可使用以下命令自动修复；若还是不成功，请认真查看报错原因，及时修复

1. `pnpm lint:eslint`： 手动使用`eslint`规则对src目录下的相关文件进行代码修复
2. `pnpm lint:prettier`： 手动使用`prettier`规则对src目录下的相关文件进行代码修复
3. `pnpm lint:stylelint`： 手动使用`stylelint`规则对所有相关文件进行代码修复
4. `pnpm lint`： 同时执行以上3个命令

## TS 中对 `.vue` 导入的类型支持

`Vue - Official` (之前是 Volar) 是官方的 VSCode 扩展，提供了 Vue 单文件组件中的 TypeScript 支持，还伴随着一些其他非常棒的特性。
> TIP
> `Vue - Official` 扩展取代了我们之前为 Vue 2 提供的官方 VSCode 扩展 Vetur。如果你之前已经安装了 Vetur，请确保在 Vue 3 的项目中禁用它。

## 开发规范

### 关于自动导入

1. vue3相关钩子函数均已自动导入，无需`import`，包括但不限于`ref`、`reactive`、`watch`等，详情请查看`src/auto-import.d.ts`
2. `src/components/` 下的文件可以自动导入，无需`import`，前提是文件名必须是组件使用时的名称。比如文件名是`TestDemo.vue`，则使用组件时必须写成 `<TestDemo />` 或者 `<test-demo />`
3. `ant design vue`组件可自动导入，无需`import`。自动导入生成文件`src/components.d.ts`

### 关于全局样式

1. 全局样式可用于修改ui库组件样式。修改时一定要限定好作用域，避免影响其他页面
2. 文件地址：`src/style.scss`

### 关于接口请求封装

1. 增加了取消请求的处理函数：`axios-abort(#https://github.com/lnquy065/axios-abort)`

- 这是一个个人库，也可以自己封装

1. 增加了请求重试的处理函数：`axios-retry(#https://github.com/softonic/axios-retry)`

- 重试的参数可以参考文档，部分使用方法也在axios.ts中

## 项目使用方法：请看`/src/docs/Introduce.md`
