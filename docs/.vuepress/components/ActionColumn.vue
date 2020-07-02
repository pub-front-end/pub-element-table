<template>
  <ve-table :data="tableData" :columns="columns" :action-column="actionColumns"></ve-table>
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
        actionColumns: {
          label: '操作',
          props: {
            fixed: 'right'
          },
          buttons: [
            {
              props: {
                type: 'danger',
                circle: true,
                icon: 'el-icon-delete',
                size: 'mini'
              },
              handler: row => {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                });
              }
            },
            {
              props: {
                type: 'primary',
                circle: true,
                icon: 'el-icon-edit',
                size: 'mini'
              },
              handler: row => {}
            }
          ]
        }
      };
    }
  };
</script>
