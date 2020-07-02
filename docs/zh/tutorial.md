# 基础用法

## 渲染数据

同`el-table`一样，我们通过`data`属性为`ve-element-table`传入数据，并通过[el-table-column](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)来定义表格的列。

实际上，`data`属性最终传给了内置的`el-table`组件，所有的`el-table-column`也同样的被作为默认插槽传给了`el-table`组件。
关于如何利用`data`属性和`el-table-column`去渲染表格，请参考[el-table](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)文档。

<ClientOnly>
<CodeExample title="基础表格" description="同原生`el-table`组件使用方式一样，创建带有分页器的基础表格。默认分页器的`currentPage`为`1`，`pageSize`为`10`。">
<TableColumn slot="example" />
::: code docs/.vuepress/components/TableColumn.vue
同`el-table`一样，通过`data`属性为`ve-table`传入数据，并通过`el-table-column`来定义表格的列。
:::
</CodeExample>

<CodeExample title="快速生成列" description="使用`columns`属性，快速创建数据列。渲染结果与上面相同。">
<BaseTable slot="example" />
::: code docs/.vuepress/components/BaseTable.vue
可以`columns`对象数组快速创建数据列。数组中的每个对象都代表一个`el-table-column`，每个键值对都可以是`el-table-column`任意
合法的属性对。
:::
</CodeExample>
</ClientOnly>

## 自动请求数据

`ve-element-table`导出了`ve-table-sync`组件，用于自动向服务端请求。通过`http-request`属性传入一个请求函数，该函数会自动执行，
然后渲染请求返回的数据。当分页切换时，该函数也会自动执行。

<ClientOnly>
<CodeExample title="带请求功能的表格" description="通过`http-request`传入请求函数，使用`props-map`属性指定要显示的数据。">
<HttpTable slot="example" />
::: code docs/.vuepress/components/HttpTable.vue
`http-request`函数会在表格开始渲染时执行，切换分页时也会自动执行。`http-request`函数的第一个参数为当前的分页对象。
`http-request`函数需要返回一个Promise，请求返回的数据可以是数组，也可以是对象。当返回对象时，需要使用`props-map`指定`data`和`total`；
返回数组时，`total`需要通过的`ve-table-sync`的`props`传入，以便分页器显示正确。
:::
</CodeExample>
</ClientOnly>

::: tip 提示
`ve-table-sync`不同于`ve-table`组件。

`ve-table`的数据缓存在前端，`data`属性传入的数据即为全部数据，然后再根据`pageSize`和`currentPage`在`ve-table`内进行分页，并且根据传入数据的长度自动计算出`total`。

`ve-table-sync`向服务端请求数据，并且解析返回的结果。由于初始时不确定服务端数据的总数量，因此`total`属性可以不指定，待请求完成后再指定`total`以便分页器显示正确。
由于数据由请求返回，因此`data`属性也不再需要，并且把返回的数据当做本次需要渲染的所有数据。
:::

## 传递prop给内置的`el-table`

`ve-element-table`只是`el-table`的高阶组件，因此它完全代理了`el-table`的所有属性与方法。你仍然可以先使用[el-table](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)一样使用`ve-element-table`。

<ClientOnly>
<CodeExample title="传递prop" description="像使用`el-table`一样使用`ve-element-table`，例如设置`stripe`和`border`，监听`selection-change`事件。">
<ElTableDemo slot="example" />
::: code docs/.vuepress/components/ElTableDemo.vue
:::
</CodeExample>
</ClientOnly>

## 设置分页

`ve-element-table`同样也代理了分页器的大部分属性，通过`currentPage`和`pageSize`设置默认的分页，并且监听分页器事件。

<ClientOnly>
<CodeExample title="设置默认分页" description="设置`currentPage`和`pageSize`改变初始的分页位置。">
<DefaultPagination slot="example" />
::: code docs/.vuepress/components/DefaultPagination.vue
可以通过`size-change`和`current-page-change`监听分页器事件，外层的`currentPage`和`pageSize`也会同步改变，行为完全类似`el-pagination`。
实际上，底层就是`el-pagination`的`size-change`和`current-change`事件。
:::
</CodeExample>
</ClientOnly>

::: warning
由于[el-pagination](http://element-cn.eleme.io/2.0/#/zh-CN/component/pagination)的`current-change`事件，与[el-table](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)的`current-change`事件重名了，因此`ve-element-table`为`el-pagination`的`current-change`
事件取了一个别名，叫`current-page-change`。
:::


