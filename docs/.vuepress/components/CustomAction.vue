<template>
  <ve-table :data="tableData" :columns="columns">
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        <el-radio
          v-model="manager"
          :label="scope.row.name"
          border
          style="margin-left: 10px"
          size="mini"
        >设为管理员</el-radio>
      </template>
    </el-table-column>
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
      })(),
      columns: [
        {
          prop: 'date',
          label: '日期',
          width: 100
        },
        {
          prop: 'name',
          label: '姓名',
          width: 60
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      manager: ''
    };
  },
  methods: {
    handleDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },
    handleEdit() {}
  }
};
</script>
