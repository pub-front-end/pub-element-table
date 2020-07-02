# ve-element-table

> 基于Element-ui 2.x的一个易用的、可自定义的、带分页功能的Table组件。

本库是基于[`element-ui`](http://element-cn.eleme.io/2.0/#/zh-CN)的封装，依赖于以下组件：

- el-table
- el-table-column
- el-button
- el-pagination

[`element-ui`](http://element-cn.eleme.io/2.0/#/zh-CN)将Table和Pagination作为了两个独立组件，让用户自己去控制两者之间的联动，这样确实带来了更多的灵活性。但是，
在绝大多数业务场景中，都只是简单的数据展示与分页，这让我们在这些情况下一直在重复大量的代码。

本库的目的在于简化Table和Pagination的使用，提供**自动分页**、**快捷生成数据列**、**快捷生成动作列**、**自动发起请求**、**分页与后端服务联动**等功能。

本库导出了3个组件`ve-table`、`ve-tree-table`和`ve-table-sync`。在一些业务场景中，数据列表缓存在前台，此时数据分页与过滤均发生在前台，`ve-table`就适用于这种场景，
它只是`el-table`和`el-pagination`的简单合并。在另外一些场景中，数据量较大，数据分页及过滤发生在后端，此时`ve-table-sync`适用于这种场景。

::: tip 提示
Element-ui 2.6.以上，已经原生支持树形数据及懒加载，所以`ve-tree-table`将不再维护。

如没有特殊说明，后文中的`ve-element-table`统值`ve-table`和`ve-table-sync`。
:::

本库参考[vue-data-tables](https://github.com/njleonzhang/vue-data-tables)实现，感谢作者[leon zhang](https://github.com/njleonzhang)。本库与`vue-data-tables`的不同之处是，
`ve-element-table`更加简单易用，属于`el-table`的高阶组件，和原生`el-table`与`el-pagination`用法几乎一样，然后在此基础上额外扩展的
自动分页、自动请求数据等功能。


