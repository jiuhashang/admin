<template>
  <div>
    <list-title />

    <builder-team-table ref="listTable" @init="handlerForm" @reset="handlerForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="status" label="审核状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.status">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="1">待审核</el-radio-button>
            <el-radio-button :label="3">已通过</el-radio-button>
            <el-radio-button :label="2">已驳回</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="tableRow">
        <el-table-column prop="companyName" label="施工单位" />
        <el-table-column prop="realName" label="申请人姓名" />
        <el-table-column prop="phone" label="申请人联系方式" />
        <el-table-column prop="createTime" label="提交时间" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="'done-status-' + scope.row.status">
              {{ scope.row.status | builderTeamCheckStatus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </builder-team-table>
  </div>
</template>

<script>
import BuilderTeamTable from '@/components/Table/BuilderTeamTable.vue'
import ListTitle from '@/components/ListTitle'

export default {
  components: {
    ListTitle, BuilderTeamTable
  },
  data() {
    return {}
  },
  activated() {
    this.$refs.listTable.getList()
  },
  methods: {
    handleView({ id }) {
      this.$router.push({
        name: 'unitListDetail',
        query: { teamId: id }
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
      console.log('messageUploadStatus receive: ', form)
      this.$set(form, 'status', undefined) // 0:未提交；1：待审核；2审核失败；3：审核成功
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
</style>
