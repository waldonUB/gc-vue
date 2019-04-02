<template>
  <el-container>
    <el-table tooltip-effect="light" max-height="524" ref="multipleTable" :data="tableData">
      <el-table-column label="序号" width="50" align="center" type="index"></el-table-column>
      <el-table-column prop="userId" show-overflow-tooltip  label="用户ID" align="center"></el-table-column>
      <el-table-column prop="userName" show-overflow-tooltip  label="用户名" align="center"></el-table-column>
      <el-table-column prop="district" show-overflow-tooltip label="用户地区" align="center"></el-table-column>
      <el-table-column prop="groupCode" show-overflow-tooltip  label="用户组编号" align="center"></el-table-column>
      <el-table-column prop="creationTime" show-overflow-tooltip  label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import axois from 'axios'
export default {
  name: 'UserManager',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    deleteUser (row) {
      const vm = this
      axois.delete('/admin/deleteUser?userId=' + row.userId).then((response) => {
        vm.getUserList()
        vm.$notify({
          type: 'info',
          title: '操作',
          message: '删除成功'
        })
      })
    },
    getUserList () {
      const vm = this
      axois.post('/admin/getUserList').then((response) => {
        vm.tableData = response.data.data
      })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style scoped>

</style>
