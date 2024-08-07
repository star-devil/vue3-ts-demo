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

### 表格`/src/components/baseTable`

#### 文件结构说明

1. `BaseTable.vue`：对a-table的二次封装组件，可继承使用a-table的全部属性和方法，props名称保持不变，请参考官网文档进行使用
2. `renderFunction`：此文件夹存放的是表格内部需要自定义渲染插入的组件（为了方便后文解释，把这个文件夹下的组件都叫做render组件）
    > 如果需要优化需求，请联系我
    - `RenderAction.vue`：渲染为操作按钮组
    - `RenderDefault.vue`：渲染为默认文字
    - `RenderLink.vue`：渲染为链接文字
    - `RenderSwitch.vue`：渲染为Switch开关
    - `RenderTags.vue`：渲染为tag标签
3. `tableSlots`：此文件夹存放的是a-table的插槽组件
    - `BodyCell.vue`：a-table单元格插槽 #bodyCell，可以插入Render组件
4. `renderComponents.ts`：根据条件将不同的render组件返回到插槽组件中的处理逻辑
5. `type.ts`：为了更灵活的扩展a-table，对其本身的类型进行继承和扩展而增加的新的类，或者一些必要的自定义的类。

#### 组件调用逻辑/数据传递顺序

```HTML
/** START----调用组件的文件，比如用户列表页面：User.vue **/
<base-table
    :columns="baseTableColumns"
    :dataSource="baseTableData"
    :loading="tableLoading"
></base-table>


/** TO----封装的table组件：BaseTable.vue **/
<a-table v-bind="$attrs">
    // 表头插槽
    <template #headerCell="{ column }">
    ...
    </template>

    // 单元格插槽
    <template #bodyCell="{ column, record, text }">
      <body-cell
        :columnType="disposeColumns(column)"
        :data="{ column, record, text }"
      />
    </template>
</a-table>


/** THEN TO----插槽组件：BodyCell.vue **/
<template>
    <component
        class="user-defined-cell"
        :is="renderMap.get(columnType)"
        :cellData="data"
    ></component>
</template>


/** END----render组件：Render***.vue，例RenderLink.vue **/
<template>
    <a-button class="px-0" type="link" v-bind.prop="aProps">
        {{cellData.text}}
    </a-button>
</template>
```

#### BaseTable 使用说明/参数说明

1. 参数和a-table官方文档一致，使用方法也一致。

   - **特别说明**：分页器的使用：同pagination。：

     - 组件已封装了一个通用分页器，可翻页。配置如下

       ```js
       const paginationObj = reactive({
         current: 1, // 默认展示第一页数据
         pageSize: 10, // 默认10条/页
         total: 0, // 初始数据总量为0
         pageSizeOptions: ["10", "20", "50", "100"], // 默认每页展示条数选项
         responsive: true, // 当 size 未指定时，根据屏幕宽度自动调整尺寸
         showSizeChanger: true, // 展示 pageSize 切换器
         showLessItems: true, // 显示较少页面内容
         showTotal: (total: number, range: number[]) =>
           `第${range[0]}~${range[1]}项，共${total} 条数据`, // 用于显示数据总量和当前数据顺序
         onChange: (page: number, pageSize: number) => {
           paginationObj.current = page;
           paginationObj.pageSize = pageSize;
           paginationProps.pagination.change(page, pageSize);
         }, // 页码或 pageSize 改变的回调,改变当前选中页码
       });
       
       ```

     - 如果是从服务端**分页**获取数据，那么可以只传入实际的总数据量（因为使用了分页，组件无法得知实际的总数据量）和页码改变时需要执行方法即可生成上述通用分页器，如果有特殊需求也可以传入对应的参数进行自定义。示例代码如下：

       ```js
       export const paginationInfo = reactive({
         pageSize: 5, // 将size指定为5
         pageSizeOptions: ["5", "10", "20", "50"], // 修改size选项
         total: 0, // 将实际total传入
         change: (page: number, pageSize: number) => { // 页码或pagesize改变的回调
           searchParams.page = page - 1; // 修改搜索参数
           searchParams.size = pageSize; // 修改搜索参数
           getData(); // 回调中执行获取数据的方法
         },
       });
       
       /* 获取表格数据的方法 */
       export function getData() {
         tableLoading.value = true;
         getTableData(searchParams)
           .then((res) => {
             baseTableData.value = res.data.content;
             paginationInfo.total = res.data.pageInfo.totalElements;// 获取数据后改变total，这个值会传入分页组件中
           })
           .finally(() => {
             tableLoading.value = false;
           });
       }
       ```

     - 如果表格数据不是从服务端获取或者**一次性得到了全部数据**，那么无需编写代码，表格会自动生成上述通用分页器，同理，若有特殊需求也支持自定义

2. 接下来将对**特殊（扩展）字段**进行说明：

   - columns扩展字段：

| 属性名     | 属性值                                            | 值类型             | 是否可以不定义或者为空                                            | 说明                                                                     |
|------------|---------------------------------------------------|--------------------|:------------------------------------------------------------------|:-------------------------------------------------------------------------|
| type       | link / tags / action / switch / paragraph / badge / undefined | string/undefined | 是                                                                | 该列值渲染为：“链接”/“标签”/“操作按钮组”/“开关”/“长文本”/''徽标“/默认文本”。不传则不做处理 |
| extraProps | 对应不同type类型组件的参数；**除特殊属性外**其余参数使用方法和对应组件一致                        | object             | 是（如果你要将单元格渲染为指定组件，就必须传这个值。不传你怎么用呢？） | 渲染为action时和其他略有不同，对象说明见下方                         |

- <u>**extraProps内特殊属性说明： 通用属性**</u>

1. 在传递所有方法类的参数时请使用props名称，比如@click方法，需要传递为`onClick`,@change为`onChange`。

2. 所有回调方法都返回了两个参数，第一个参数为组件文档里说明的回返回的所有值，第二个为事件作用的行的数据。

   ```js
   示例：
   // colomns定义将单元格渲染为switch，并传递点击的回调函数为clickSwitch
   const colomns = [
   {
      title: "Status",
      dataIndex: "status",
      key: "status",
      type: "switch",
      extraProps: {
         onClick: clickSwitch,
      }
   }]
   // clickSwitch可以得到当前点击选中状态和当前行数据
   const clickSwitch = (checked: boolean | string | number, cbData: any) => {
      console.log("switchClick-", checked, "cbData---", cbData);
   };
   ```

3. 含有禁用属性的组件拥有特殊的`disable`属性（注意不是原生属性disabled），比如link、switch、action。

   | 属性名  | 属性值         | 值类型   | 说明                                                                                                                                |
   |---------|----------------|----------|:------------------------------------------------------------------------------------------------------------------------------------|
   | disable | [{key: value}] | object[] | 控制组件是否禁用：数组内各item之间存在或关系，即当满足其中一个item的条件即可禁用。item内部存在且关系，即当item内部条件全部满足时才会禁用。|

   ```js
   示例：
   disable: [{name: "Jim Green",age: 42,},{status: "on"}]
   // 当前行数据（name==="Jim Green"且age===42）或status==="on"时组件被禁用
   ```

- <u>**extraProps内特殊属性说明： 专属属性** </u>

1. 单元格渲染为`tag`时（type=tag）的特殊属性：`colors`、`icons`。注意不是color和icon

   | 属性名  | 属性值         | 值类型   | 说明                                                                                                                                |
   |---------|----------------|----------|:------------------------------------------------------------------------------------------------------------------------------------|
   | colors | 单个颜色 / 颜色数组 / [{value: any,color: string}] | string / string[] / object[] | 非必传。用于控制标签按条件显示不同颜色|
   | icons | h(图标) / [{value: any,icon: h(图标)}] | VNode / object[] | 非必传。用于控制标签按条件显示不同图标|

   ```js
   示例：
   // columns定义数据description渲染为标签
   const columns = [
   {
      title: "Tags",
      key: "description",
      dataIndex: "description",
      type: "tags",
      extraProps: {
         colors: [
         {
            value: "nice", // 表示当description的值=nice时，标签颜色为green
            color: "green",
         },
         {
            value: "cool", // 表示当description的值=cool时，标签颜色为green
            color: "green",
         },
         {
            value: "developer", // 表示当description的值=developer时，标签颜色为volcano
            color: "volcano",
         },
         {
            value: "teacher", // 表示当description的值=teacher时，标签颜色为pink
            color: "pink",
         },
         ],
         icons: h(TwitterOutlined) // 表示所有的标签都显示icon，icon是TwitterOutlined。如果你想指定某个值现在某个标签，也可以写成数组对象，类似colors。
      },
   ]
   ```

2. 单元格渲染为`switch`时（type=switch）特殊的属性

   | 属性名  | 属性值         | 值类型   | 说明                                                                                                                                |
   |---------|----------------|----------|:------------------------------------------------------------------------------------------------------------------------------------|
   | checked | 当前列数据的某个值 | any | 必传！否则没办法控制开与关。当前单元格的数值与你设定的值相等时开会就会打开

3. 单元格渲染为`action`时（type=action）特殊的属性

   | 属性名      | 属性值                                                                                                                                        | 值类型             | 是否可以为空或者不传           | 说明                                                                                                                                                                                            |
   |-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------|:-------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | actionsType | link / text / icon / mixin                                                                                                                    | string             | 是。**不传默认显示为link类型按钮**          | 所有类型都是**渲染为button**，不同值对应button的不同类型：链接按钮 / 文字按钮 / 纯图标按钮 / 混合（图标+文字）按钮。icon自带tooltip。                                                                                                                                     |
   | color       | success / warning / danger / hex / undefined                                                                                                        | string / undefined | 是。不传和undefined表示不做处理 | 按钮文字图标颜色：success绿色 / warning金色 / error红色 / 自定义十六进制颜色值 / 不做处理。**注意**：如果传入自定义的十六进制颜色，鼠标悬浮到按钮上，文字不会有hover颜色变化，所以请尽量使用已配置好的框架颜色。tooltip气泡也会使用这个颜色。 |
   | actions     | [{text: 按钮文字（**图标按钮的tooltip文字**）, disable: 禁用条件（参考通用属性disable说明）,hide:隐藏条件（与disable用法相同）,props:{button自身参数}}] | object[]           | 否。不传你用什么渲染按钮呢？     | 将按照这个配置渲染出一组按钮                                                                                                                                                                     |

    ```js
    示例：主要注意actionsType 、text 、color的解释
      {
        title: "Action",         
        type: "action", // 此单元格渲染为button组
        extraProps: {
          actionsType: "mixin", // link | text | icon | mixin
          actions: [
            {
              // link\text\mixin按钮显示的文字，icon按钮的tooltip标题
              text: "邀请", 
              // 按钮禁用条件，请看上面解释
              disable: [
                {
                  name: "John Brown",
                },
                {
                  age: 32,
                },
              ],
              // 按钮隐藏条件
              hide: [
                {
                  status: "off",
                },
              ],
              // 按钮button本身的参数
              props: {
                // 如果按钮要显示图标，请传这个。所以icon、mixin类型必传icon。link、text类型也可以使用icon。
                icon: h(HeartOutlined),
                onClick: goDetail,
              },
            },
            {
              text: "详情",
              // 按钮显示为金色
              color: "warning", // success | warning | danger | hex | undefined
              props: {
                icon: h(ContactsOutlined),
                onClick: goDetail,
              },
            },
            {
              text: "修改",
              // 按钮显示为绿色
              color: "success", 
              disable: [
                {
                  name: "Jim Green",
                  age: 42,
                },
              ],
              props: {
                icon: h(EditOutlined),
                onClick: goDetail,
              },
            },
            {
              text: "删除",
              // 按钮显示为红色
              color: "danger",
              props: {
                icon: h(DeleteOutlined),
                onClick: goDetail,
              },
            },
          ],
        },
      }  
    ```

4. 单元格内渲染长文本`paragraph`时（type=paragraph）特殊的属性：

   - 长文本单元格最好有固定width，这样能达到更好的显示效果。
   - 渲染长文本有两种选择，大量文本推荐优先使用 expandable（折叠文字），少量文本推荐使用 tooltip（悬浮展示）。注意渲染的文字是column.text，如有特殊需求，请使用`customRender`自行处理。
   - 处理为`tooltip`展示时使用的是antdv的`Typography.Text`组件，继承了组件所有参数。**注意：如果设置ellipsis.expandable=true，则会处理为折叠文字，Text的所有参数将不起作用**，所以如果想处理为tooltip最好是**不要设置ellipsis.expandable字段**。
   - 处理为`expandable`展示时，使用的是`src/components/foldTypography/FoldTypography.vue`组件，（为什么不用`Typography.Paragraph`？因为它只能展开不能折叠）。折叠操作默认渲染为按钮，文字是【更多】和【收起】，不支持修改。主要常用参数如下，全部参数请看[text-clamp](https://sherwinshen.github.io/vue3-text-clamp/)：

   | 属性名         | 属性值 | 值类型  | 是否可以为空或者不传 | 说明                     |
   | -------------- | ------ | ------- | -------------------- | ------------------------ |
   | ellipsis       | {}     | object  | 是                   | 不传则处理为tooltip      |
   | \|- maxLines   | 1-10   | number  | 否                   | 显示的最大行数           |
   | \|- expandable | true   | boolean | 是                   | 为true才会处理为折叠文字 |

5. 单元格内渲染徽标`badge`时（type=badge）特殊的属性：`colors`。注意不是color<!--（color是badge自带api，可以直接使用，无需特别处理）-->

   | 属性名 | 属性值                       | 值类型   | 说明                                   |
   | ------ | ---------------------------- | -------- | :------------------------------------- |
   | colors | [{value: any,color: string}] | object[] | 非必传。用于控制标签按条件显示不同颜色 |

   ```ts
   示例：
   {
       title: "年龄",
       dataIndex: "age",
       key: "age",
       type: "badge",
       extraProps: {
         color: "pink", // 使用badge自带的属性，表示所有年龄单元格都显示为粉色
         status: "processing", // color和processing同时存在，可以改变processing的颜色，保留动效
         colors: [
           {
             value: 22, // 年龄=22岁时，徽标显示粉色
             color: "pink",
           },
           {
             value: 32, // 年龄=22岁时，徽标显示为状态processing样式
             // color: "cyan", // 也支持和status同时存在
             status: "processing",
           },
           {
             value: 42,// 年龄=22岁时，徽标显示为状态success样式
             status: "success",
           },
         ],
       },
     },
   ```

### 代码编辑器`/src/components/codeEditor`

#### 组件介绍

1. 在线代码编辑器，基于`[codemirror](https://rennzhang.github.io/codemirror-editor-vue3/guide/getting-started)`封装。
2. 封装的语言有：javascript、html、xml、css、json、vue、markdown、php、python、sql、go、yaml、c、c++、java，若想支持更多语言，请参考官网。
3. 封装的功能有：代码折叠、自动提示、代码校验（目前只支持js和json）、自定义宽高、切换只读、边框展示
4. 封装的主题有8种，4种暗色、4种亮色，可以根据系统暗亮主题切换自动更换：base16-dark、base16-light、blackboard、darcula、duotone-dark、duotone-light、elegant、juejin。若想支持更多主题，请参考官网。
5. 新增的功能：调整行距、字体大小调整、复制代码

#### 使用说明

1. 在需要的地方直接使用`<CodeEditor />`即可
2. 参数

   | 属性名   | 默认值                | 值类型  | 是否可以为空或者不传 | 说明                                     |
   | -------- | --------------------- | ------- | -------------------- | ---------------------------------------- |
   | code     | 一串JSON              | String  | 否                   | 不传的话使用的是示例代码                 |
   | language | javascript            | String  | 是                   | 编辑器当前语法                           |
   | height   | {number:100,unix:"%"} | Object  | 是                   | 高度可以配置单位：%、px、rem、em、vw、vh |
   | width    | {number:100,unix:"%"} | Object  | 是                   | 宽度可以配置单位：%、px、rem、em、vw、vh |
   | readOnly | false                 | Boolean | 是                   | 编辑器只读，不可编辑                     |
   | needCopy | true                  | Boolean | 是                   | 默认提供代码复制功能                     |

3. 方法

   | 方法名     | 参数    | 参数类型 | 说明                                          |
   | ---------- | ------- | -------- | --------------------------------------------- |
   | getNewCode | newCode | String   | 点击保存按钮，获取编辑框当前的代码（newCode） |

### 复制按钮`/src/components/copyTextButton

#### 组件介绍

1. 这是基于`antdv: a-typography-paragraph`封装的组件。因为`a-typography-paragraph`这个组件在使用时时一串文字后面跟着复制文字按钮，即文字和复制是组合出现的，所以当需要复制的内容和按钮需要分开时就不适用了。
2. 利用`a-typography-paragraph`自带的文本复制功能，封装了一个复制按钮，无需下载别的插件。

#### 使用方法

1. 在需要的地方直接使用`<CopyButton :code="text" />`即可，`code`是等待复制的文本内容



### 超长文本折叠展开/src/components/foldTypography`

#### 组件介绍

1. 针对超长文本实现溢出展示...并提供展开全文和收起超出部分的功能。
2. （为什么不用`Typography.Paragraph`？因为它只能展开不能折叠）。折叠操作默认渲染为按钮，文字是【更多】和【收起】，不支持修改。主要常用参数如下，全部参数请看[text-clamp](https://sherwinshen.github.io/vue3-text-clamp/)

#### 使用说明

1. 在需要使用的地方引用`<fold-typography/>`即可

2. 参数

   | 属性名         | 属性值 | 值类型  | 是否可以为空或者不传 | 说明                               |
   | -------------- | ------ | ------- | -------------------- | ---------------------------------- |
   | ellipsis       | {}     | object  | 否                   | 文字溢出的处理配置                 |
   | \|- maxLines   | 1-10   | number  | 否                   | 显示的最大行数，会根据宽度自动计算 |
   | \|- expandable | true   | boolean | 否                   | 为true才会处理为折叠文字           |
   | text           | ""     | string  | 否                   | 需要处理的文字                     |



## 关于自定义主题的样式变量获取

1. 使用之前确保你已经了解并会使用antdv4.x提供的【Design Token】主题配色方案！！
   新版本antv已经提供了很方便的动态主题切换方案，**为保持项目整体样式统一**，请尽量全部**使用框架提供的主题样式变量！！**

2. [主题在线编辑器](https://www.antdv.com/theme-editor-cn)

3. 当前主题所有变量已打印在控制台，标志为：**colorTokenArr**，请自行查看取用
   当前主题配色改动字段文件路径：`src/theme/index.ts`，可自行修改
   非常用的样式变量可以查看[主题文档api](https://www.antdv.com/docs/vue/customize-theme-cn#api)

### 如何在ts文件中获取自定义主题内的样式变量？

1. 确定你想使用的样式变量名称
2. 找到`src/theme/getTokenStore.ts`文件
3. 在文件中按照以下方法将变量导出

   ```javascript
   /** 文字悬浮背景颜色想要使用变量colorBgTextHover */
   export const textHoverBgColor = () => useThemeToken().token.colorBgTextHover;
   ```

4. 在需要使用样式的地方导入第3步定义的方法即可（注意，导入的是字符串）

### 如何在样式文件中获取自定义主题内的样式变量？

1. 确定你想使用的样式变量名称，如`colorBgLayout`。
2. 在样式文件中直接使用css语法引用变量即可，比如`var(--colorBgLayout)`

### 注意

1. 上述逻辑是基于组件`CssVariableSetter.vue`实现的，**请不要删除**
2. 组件存放路径`/src/components/cssVariableSetter`

## 如何使用Iconfont?

1. 依旧是使用[阿里巴巴矢量图标库](https://www.iconfont.cn/?spm=a313x.manage_type_myprojects.i3.2.1bf93a81iCTRD5)作为补充图标。
2. 和以往相比，本项目的改为使用本地引用了。本地图标存储路径`src/assets/iconfont/index.js`
3. 本地文件内容：在线图标库项目中选择`symbol`，点击在线链接，会跳转到代码页面。全选复制，全文替换第2点中的文件内容。（注意：**请保留文件注释头**）
4. 注意：**路由（侧边菜单）**中的icon**只能**使用Iconfont。因为在新版menu兼容动态路由icon渲染的同时，要保证图标够用，这是最简单的方法。
5. 推荐Iconfont上与antdv官方图标同源图标库（相信在某些情况下你会用到，比如第4点）：
   - [twotone、outline、fill](https://www.iconfont.cn/user/detail?spm=a313x.collections_detail.i1.d9bd4f23f.40283a81xxiYj4&uid=5295564&nid=U24YmIFfC8lJ)
