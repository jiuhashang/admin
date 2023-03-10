<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="messageUploadStatus" label="录入状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.companyStatus">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">待录入</el-radio-button>
            <el-radio-button label="1">已完善</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="tableRow">
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="录入状态">
          <template slot-scope="scope">
            <span v-if="scope.row.companyInfoStatus == 1 && scope.row.companyBulidStatus == 1 && scope.row.companyStockStatus == 1 && scope.row.companyOrganizationStatus == 1 && scope.row.companyBusinessStatus == 1 && scope.row.companyFinanceStatus == 1 && scope.row.companyProjectStatus == 1 && scope.row.companyContractStatus == 1" style="color: #70B603;">已完善</span>
            <!-- <span v-if="scope.row.companyInfoStatus == 0 || scope.row.companyBulidStatus == 0 || scope.row.companyStockStatus == 0 || scope.row.companyOrganizationStatus == 0 || scope.row.companyBusinessStatus == 0 || scope.row.companyFinanceStatus == 0 || scope.row.companyProjectStatus == 0 || scope.row.companyContractStatus == 0" style="color: #F59A23;">待录入</span> -->
            <span v-else style="color: #F59A23;">待录入</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">{{ scope.row.companyInfoStatus == 1 && scope.row.companyBulidStatus == 1 && scope.row.companyStockStatus == 1 && scope.row.companyOrganizationStatus == 1 && scope.row.companyBusinessStatus == 1 && scope.row.companyFinanceStatus == 1 && scope.row.companyProjectStatus == 1 && scope.row.companyContractStatus == 1 ? '查看' : '录入' }}</el-button>
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
    handlerForm(form) {
      // console.log('messageUploadStatus receive: ', form)
      this.$set(form, 'companyStatus', undefined)
      // this.$set(form, 'projectType', 1) // 项目节点：projectType: 0:全部 1：待审核之后；2：录入审核通过后(银行通过；后台强制通过) 3:初审通过后
    },
    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'developmentDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
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
