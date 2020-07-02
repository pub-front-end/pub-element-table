<template>
  <ve-table :data="tableData">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </ve-table>
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
      })()
    };
  }
};
</script>
