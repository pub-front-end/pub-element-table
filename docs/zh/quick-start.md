# 快速上手

::: warning 注意
请先安装 [Vue 2.x](https://cn.vuejs.org/)和[Element-ui 2.x](http://element-cn.eleme.io/2.0/#/zh-CN)。
:::

## 安装

建议使用`yarn`安装。

```bash
yarn add @liaoct/vue-element-ui
```

如果想使用自动发起请求功能，你可能还需要安装[axios](https://github.com/axios/axios)，本库使用`axios`作为 HTTP 客户端。当然，如果你想自己控制请求过程，则你不需要安装它。

## 引入 element-ui

本库依赖于[element-ui](http://element-cn.eleme.io/2.0/#/zh-CN)的`el-table`、`el-table-column`、`el-button`、`el-pagination`组件，因此在引入`vue-element-table`之前，你需要先引入以上组件。

**完整引入**

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

**使用国际化**

由于`el-pgination`涉及到国际化，所以如果需要的话，请参考[文档](http://element-cn.eleme.io/2.0/#/zh-CN/component/i18n)进行设置。

```js
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(ElementUI, { locale });
```

**按需引入**

请参考[element-ui](http://element-cn.eleme.io/2.0/#/zh-CN)官方文档。

## 引入 vue-element-table

**完整引入**

```vue
import VeTable from '@liaoct/vue-element-table'; import '@liaoct/vue-element-table/dist/VeTable.css';
Vue.use(VeTable);
```

**独立引入**

```vue
import { VeTable, VeTableSync, VeTreeTable } from '@liaoct/vue-element-table'; import
'@liaoct/vue-element-table/dist/VeTable.css'; Vue.component(VeTable.name, VeTable);
Vue.component(VeTableSync.name, VeTableSync); Vue.component(VeTreeTable.name, VeTreeTable); /* 或写为 *
Vue.use(VeTable) * Vue.use(VeTableSync) * Vue.use(VeTreeTable) * 或者在组件中直接使用 * components: { VeTable,
VeTableSync, VeTreeTable } */
```

::: tip 提示
Element-ui 2.6.以上，已经原生支持树形数据及懒加载，所以`ve-tree-table`将不再维护。
:::

需要注意的是，样式文件需要单独引入。

**按需引入**

::: warning 暂不支持
TODO
:::

**使用源码**

如果你想控制打包体积，则需要编译源码。本库源码依赖[lodash](https://www.lodashjs.com/)并采用`jsx`语法编写，而样式采用的是`scss`编写，所以你需要安装对应的依赖。

此处以`Vue cli 3.5.5`初始化并选择`dart-sass`作为样式处理器的项目为例。

1. 安装依赖项。

    - [`lodash`](https://www.npmjs.com/package/lodash)
    - [`babel-plugin-lodash`](https://www.npmjs.com/package/babel-plugin-lodash)
    - [`lodash-webpack-plugin`](https://www.npmjs.com/package/lodash-webpack-plugin)
    - [`@vue/babel-preset-jsx`](https://www.npmjs.com/package/@vue/babel-preset-app)

2. 修改`vue.config.js`。

```js
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new LodashModuleReplacementPlugin({
                paths: true
            })
        ]
    },
    transpileDependencies: ['@liaoct/vue-element-table']
};
```

3. 修改`babel.config.js`。

```js
module.exports = {
    presets: [['@vue/app', { jsx: false }], '@vue/babel-preset-jsx'],
    plugins: ['lodash']
};
```

4. 引入源码，并进行打包。

```js
import VeTable from '@liaoct/vue-element-table/src/index.js';
```

当编译源码时，样式不需要单独引入。当进行打包时，样式文件也会一并打包。

## 开始使用

<ClientOnly>
<CodeExample title="基础示例" description="创建一个基础功能表格，自动处理分页。">
<BaseTable slot="example" />
::: code docs/.vuepress/components/BaseTable.vue
同`el-table`一样，给`ve-table`传入`data`对象数组。`columns`对象数组用来指定表格的列，每个对象元素代表一个`el-table-column`，可以传入任意合法的`el-table-column`属性，如`label`属性定义列名，`prop`属性用来选取数据对象的键名。
:::
</CodeExample>
</ClientOnly>
