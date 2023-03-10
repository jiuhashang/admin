<template>
  <div>
    <list-title />
    <el-card>
      <el-input v-model="selectInfo.queryParams" placeholder="项目ID、项目公司、施工单位搜索" style="width:300px;margin-right:10px;" clearable @blur="selectBlur" />
      <el-button type="primary" @click="getSpecialCaseProjectList">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="neverConfirmNum" label="待确认" />
        <el-table-column prop="alreadyConfirmNum" label="已确认" />
        <el-table-column prop="refuseNum" label="已拒绝" />
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import ListTitle from '@/components/ListTitle'
import { getSpecialCaseProjectList } from '@/api/specialApplication'
export default {
  components: {
    ListTitle
  },
  data() {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
        projectId: '',
        companyName: '',
        buildName: ''
      },
      selectInfo: {
        queryParams: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getSpecialCaseProjectList()
  },
  activated() {
    this.getSpecialCaseProjectList()
  },
  methods: {
    getSpecialCaseProjectList() {
      getSpecialCaseProjectList(this.queryInfo).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    reset() {
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10,
        code: '',
        companyName: '',
        buildCompanyName: ''
      }
      this.selectInfo = {
        queryParams: ''
      }
      this.getSpecialCaseProjectList()
    },
    selectBlur() {
      this.queryInfo.projectId = this.selectInfo.queryParams
      this.queryInfo.companyName = this.selectInfo.queryParams
      this.queryInfo.buildName = this.selectInfo.queryParams
    },
    handleView(row) {
      this.$router.push({ name: 'specialApplicationDetail', query: { projectId: row.projectId, companyName: row.companyName, buildUserName: row.buildUserName }})
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getSpecialCaseProjectList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageIndex = val
      this.getSpecialCaseProjectList()
    },
    handleClose() {
      this.dialogVisible = false
      this.imgSrc = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-table {
  margin: 20px 0;
}
.el-pagination {
  margin: 20px;
  float: right;
}
</style>
