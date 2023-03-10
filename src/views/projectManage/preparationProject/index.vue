<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm" @init="handlerForm" @reset="handlerForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="projectReadyStatus" label="准备状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.projectReadyStatus">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="0">未准备</el-radio-button>
            <el-radio-button :label="1">已准备</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="projectType" label="项目节点状态：" style="margin: 0 60px; display: none">
          <el-radio-group v-model="scope.tableInfo.projectType">
            <el-radio-button :label="2">录入审核通过后(银行通过；后台强制通过)</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="tableRow">
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="messageExamineTime" label="通过审核时间" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.projectReadyStatus === 1" class="done-status done">已准备</span>
            <span v-else class="done-status">未准备</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.projectReadyStatus === 0" type="text" @click="handleView(scope.row)">处理</el-button>
            <el-button v-else type="text" @click="handleView(scope.row)">查看</el-button>
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
    return {}
  },
  activated() {
    this.$refs.tableForm.getList()
  },
  methods: {
    handleView(row) {
      this.$router.push({
        name: 'preparationProjectDetail',
        query: {
          projectId: row.projectId,
          createTime: row.createTime,
          createUser: row.createUser,
          projectReadyStatus: row.projectReadyStatus
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 重置表单
    handlerForm(form) {
      console.log('receive: ', form)
      this.$set(form, 'projectReadyStatus', undefined)
      this.$set(form, 'projectType', 2)
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
