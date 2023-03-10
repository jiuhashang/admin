<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm" @init="handlerForm" @reset="handlerForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="status" label="准备状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.status">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="7">待审核</el-radio-button>
            <el-radio-button :label="11">已通过</el-radio-button>
            <el-radio-button :label="10">已驳回</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="projectType" label="项目节点状态：" style="margin: 0 60px; display: none">
          <el-radio-group v-model="scope.tableInfo.projectType">
            <el-radio-button :label="3">初审通过后</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="tableRow">
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="buildFirstExamineTime" label="提交时间" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 10" class="done-status red">已驳回</span>
            <span v-else-if="scope.row.status === 9 || scope.row.status > 10" class="done-status done">已通过</span>
            <span v-else class="done-status">待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="text" @click="handleView(scope.row)">处理</el-button>
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
        name: 'auditAcceptanceDetail',
        query: {
          projectId: row.projectId,
          createTime: row.createTime,
          createUser: row.createUser
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
      this.$set(form, 'status', undefined)
      this.$set(form, 'projectType', 3)
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
