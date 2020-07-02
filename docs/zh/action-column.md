# 动作列

## 快速生成动作列

通过`action-column`属性，可以快速常见动作列。

`action-column`对象的格式如下：

```js
{
    label?: String;                // 动作列的表头，默认为'操作'。
    props?: {                      // 动作列 el-table-column 的 prop，如果需要自定义该列特性，请在此处设置
        [prop: string]: any;
    },
    buttons: [                     // 定义动作列里的 el-button 元素
        {
            props?: {                  // 用于传入 el-button 的 prop，如果要设置该按钮，请在此处设置
                [prop: string]: any;
            },
            handler?: (row, column, $index, store) => void;   // 点击事件的 callback, 注意使用箭头函数，
                                       // 否则 `this` 就不是使用 `ve-element-table` 组件了。
                                       // 参数 row 为此项的数据
            label?: String;             // 按钮的 label
        },
        ...
    ]
}
```

下面示例使用了快速生成动作列方式，并且包含两个功能按钮。

<ClientOnly>
<CodeExample title="带有动作列的表格" description="通过传入`action-column`快速生成动作列。">
<ActionColumn slot="example" />
::: code docs/.vuepress/components/ActionColumn.vue
`props`采用JS对象传入，建议使用 camelCase 风格来写书 js 对象的属性。
:::
</CodeExample>
</ClientOnly>

## 自定义动作列

快速生成动作列只支持按钮形式，不支持按列定制。如果有需要，可以通过`slot-scope`来自定义动作列。实际上这就是`el-table`的
[自定义列模板](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)方法。

<ClientOnly>
<CodeExample title="多功能的动作列" description="可以通过`slot-scope`来自定义动作列。">
<CustomAction slot="example" />
::: code docs/.vuepress/components/CustomAction.vue
使用`el-table`的[自定义列模板](http://element-cn.eleme.io/2.0/#/zh-CN/component/table)方法可以生成功能丰富的动作列。当既使用了`columns`属性，又使用了`el-table-column`时，
`columns`规定的列将显示在签名，而`action-column`规定的列始终显示在末尾。
:::
</CodeExample>
</ClientOnly>
