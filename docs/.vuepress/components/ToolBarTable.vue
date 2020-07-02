<template>
  <ve-table
    ref="multipleTable"
    :data="tableData"
    :columns="columns"
    layout="table,pagination,tool"
    @selection-change="handleSelectionChange"
  >
    <div style="margin-top: 20px" slot="tool">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </ve-table>
</template>

<script>
import Mock from 'mockjs';

export default {
  data() {
    return {
      multipleSelection: [],
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
          type: 'selection',
          width: 55
        },
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
