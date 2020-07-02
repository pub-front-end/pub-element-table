<template>
  <ve-table
    :data="tableData"
    :columns="columns"
    :current-page="pages.currentPage"
    :page-size="pages.pageSize"
    @current-page-change="handleCurrentPageChange"
    @size-change="handleSizeChange"
  ></ve-table>
</template>

<script>
import Mock from 'mockjs';

export default {
  data() {
    return {
      pages: {
        currentPage: 2,
        pageSize: 20
      },
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
      ]
    };
  },
  methods: {
    handleSizeChange(size) {
      this.$message(`当前pageSize为${size}`);
    },
    handleCurrentPageChange(page) {
      this.$message(`当前currentPage为${page}`);
    }
  }
};
</script>
