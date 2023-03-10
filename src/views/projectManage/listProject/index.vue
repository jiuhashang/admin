<template>
  <div>
    <list-title />
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.query" placeholder="项目ID、项目公司、施工单位搜索" clearable style="width:300px;" @blur="select" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <!-- <el-button type="primary" @click="downloadPdf">导出PDF</el-button> -->
          <el-button type="primary" @click="downLoad">材料预下载</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="createTime" label="项目发起时间" />
        <el-table-column label="当前进度">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0 || scope.row.status == 2">项目录入</span>
            <span v-else-if="(scope.row.messageUploadStatus == 0 || scope.row.messageUploadStatus == 3) && scope.row.status == 1 ">项目初审</span>
            <span v-else-if="scope.row.status == 1 && scope.row.messageUploadStatus == 2">项目二审</span>
            <span v-else-if="scope.row.status == 3 && scope.row.buildStatus == 0">项目准备</span>
            <span v-else-if="(scope.row.status == 3 || scope.row.status == 6) && scope.row.buildStatus == 1">图纸确认</span>
            <span v-else-if="(scope.row.status == 3 || scope.row.status == 6) && scope.row.buildStatus == 2">施工准备</span>
            <span v-else-if="(scope.row.status == 3 || scope.row.status == 6) && scope.row.buildStatus == 3">施工过程</span>
            <span v-else-if="(scope.row.status == 5 || scope.row.status == 7 || scope.row.status == 8 || scope.row.status == 10) && scope.row.buildStatus == 3">施工验收</span>
            <span v-else-if="scope.row.status == 11 || scope.row.status == 13">并网录入</span>
            <span v-else-if="(scope.row.gridConnectionStatus == 0 || scope.row.gridConnectionStatus == 3) && scope.row.status == 12">并网初审</span>
            <span v-else-if="scope.row.status == 12 && scope.row.gridConnectionStatus == 2">并网二审</span>
            <span v-else-if="scope.row.status == 14">项目完成</span>
          </template>
        </el-table-column>
        <el-table-column label="放款情况">
          <template slot-scope="scope">
            {{ scope.row.messageUploadStatus | showMessage }}
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="downloadPdf(scope.row)">导出PDF</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getList, readyDownFile, getProjectPdf } from '@/api/listProject'

import ListTitle from '@/components/ListTitle'

export default {
  components: {
    ListTitle
  },
  filters: {
    // 当前进度
    // showStatus(status) {
    //   if (status === 0) {
    //     return '待录入'
    //   } else if (status === 1) {
    //     return '待审核'
    //   } else if (status === 2) {
    //     return '审核驳回'
    //   } else if (status === 3) {
    //     return '审核通过'
    //   } else if (status === 4) {
    //     return '施工进行中'
    //   } else if (status === 5) {
    //     return '待审核'
    //   } else if (status === 6) {
    //     return '审核驳回'
    //   } else if (status === 7) {
    //     return '审核通过'
    //   } else if (status === 8) {
    //     return '并网信息待录入'
    //   } else if (status === 9) {
    //     return '并网信息待审核'
    //   } else if (status === 10) {
    //     return '并网信息驳回'
    //   } else if (status === 11) {
    //     return '并网信息审核通过'
    //   }
    // },
    // 放款进度
    showMessage(status) {
      if (status === 0) {
        return '未完成审核'
      } else if (status === 1) {
        return '未完成审核'
      } else if (status === 2) {
        return '未完成审核'
      } else if (status === 3) {
        return '不可放款'
      } else if (status === 4) {
        return '可放款'
      } else if (status === 5) {
        return '不可放款'
      }
    }
  },
  data() {
    return {
      tableInfo: {
        query: ''
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
        companyName: '',
        buildName: '',
        projectId: ''
      },
      tableData: [],
      multipleSelection: [],
      total: null
    }
  },
  created() {
    this.getList()
  },
  // activated() {
  //   this.$refs.tableForm.getList()
  // },
  activated() {
    this.getList()
  },
  methods: {
    downloadPdf(rowInfo) {
      // if (this.multipleSelection.length !== 1) {
      //   this.$alert('请选择<span style="color: #D9001B">一个</span>项目进行pdf导出', '提示', {
      //     confirmButtonText: '好的',
      //     showClose: false,
      //     dangerouslyUseHTMLString: true
      //   })
      //   return
      // }
      getProjectPdf(rowInfo.projectId).then(res => {
        res?.data?.url && window.open(res.data.url, '_blank')
      })
    },
    // 列表请求
    getList() {
      getList(this.queryInfo).then(res => {
        console.log(res)
        const { current, records, total } = res.data
        this.tableData = records
        this.currentPage = current
        this.total = total
      })
    },
    select() {
      // console.log(this.tableInfo)
      this.queryInfo.companyName = this.tableInfo.query
      this.queryInfo.buildName = this.tableInfo.query
      this.queryInfo.projectId = this.tableInfo.query
    },
    // 表dan查询
    handleQuery() {
      // this.queryInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: ''
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10,
        companyName: '',
        buildName: '',
        projectId: ''
      }
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },

    // 材料预下载
    downLoad() {
      if (this.multipleSelection.length < 1) {
        this.$alert('请选择项目进行材料预下载', '提示', {
          confirmButtonText: '好的',
          showClose: false
        })
        return
      }
      // console.log(this.multipleSelection)
      this.$confirm(`您选择了${this.multipleSelection.length}个项目，是否下载项目材料？<br>下载的项目资料将会以预下载的形式存储7日，请在下载管理中，下载至电脑内。`, '提示', {
        confirmButtonText: '确定下载',
        cancelButtonText: '取消',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        dangerouslyUseHTMLString: true

      }).then(() => {
        this.predownload()
      }).catch(console.warn)
    },

    predownload() {
      const projectIdList = this.multipleSelection.map(({ projectId }) => projectId)
      readyDownFile(projectIdList).then(() => {
        this.$message({
          type: 'success',
          message: '下载成功!'
        })
      })
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'listProjectDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pageIndex = val
      this.getList()
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
