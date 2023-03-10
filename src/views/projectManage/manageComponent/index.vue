<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm">
      <template slot="tableRow">
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </template>
    </list-project-table>
  </div>
</template>

<script>
import ListTitle from '@/components/ListTitle'
import ListProjectTable from '@/components/Table/ListProjectTable.vue'

export default {
  components: {
    ListTitle,
    ListProjectTable
  },
  data() {
    return {
    }
  },
  created() {

  },
  activated() {
    this.$refs.tableForm.getList()
  },
  methods: {
    handleChange(arg0) {
      // console.log('=================', arg0)
    },
    // 查看详情
    handleView(row) {
      // console.log('111', row)
      this.$router.push({ name: 'manageComponentDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-pagination {
  margin: 20px;
  float: right;
}

.done-status {
  color: #F59A23;

  &.done {
    color: #70B603;
  }
}
</style>
