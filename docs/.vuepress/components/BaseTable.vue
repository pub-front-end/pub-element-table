<template>
  <ve-table :data="tableData" :columns="columns"></ve-table>
</template>

<script>
  import Mock from 'mockjs';

  export default {
    data() {
      return {
        tableData: (() => {
          const data = [];
          for (let i = 0; i < 50; i++) {
            data.push(
              Mock.mock({
                date: '@date',
                name: '@cname',
                address: '@county(true)'
              })
            );
          }
          return data;
        })(),
        columns: [
          {
            prop: 'date',
            label: '日期',
            width: 180,
            render(h, { row, column, $index }) {
              return <span>{row.name}</span>;
            }
          },
          {
            prop: 'name',
            label: '姓名',
            width: 180
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      };
    }
  };
</script>
