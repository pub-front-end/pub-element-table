<template>
  <ve-table-sync :columns="columns" :http-request="requestData" :props-map="propsMap"></ve-table-sync>
</template>

<script>
  import Mock from 'mockjs';

  export default {
    data() {
      return {
        columns: [
          {
            prop: 'date',
            label: '日期',
            width: 180
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
        ],
        propsMap: {
          data: 'data',
          total: 'total'
        }
      };
    },
    methods: {
      requestData({ pageSize, currentPage }) {
        return new Promise(resolve => {
          const data = [];
          for (let i = 0; i < pageSize; i++) {
            data.push(
              Mock.mock({
                date: '@date',
                name: '@cname',
                address: '@county(true)'
              })
            );
          }
          resolve(
            Mock.mock({
              pageSize,
              currentPage,
              total: '@natural(1, 100)',
              data
            })
          );
        });
      }
    }
  };
</script>
