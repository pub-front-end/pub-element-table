# 工具栏

`ve-element-table`提供了一个`tool`插槽，允许将工具条作为插槽放在表格内部。配合`layout`属性，可以调整`工具栏`、`表格`和`分页栏`之间的位置。

<ClientOnly>
<CodeExample title="插入工具栏" description="通过`tool`具名插槽放入工具栏，`layout`属性将工具栏放在表格和分页器的下方。">
<ToolBarTable slot="example" />
::: code docs/.vuepress/components/ToolBarTable.vue
用法参考示例。
:::
</CodeExample>
</ClientOnly>
