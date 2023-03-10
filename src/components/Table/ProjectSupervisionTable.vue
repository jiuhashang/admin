<template>
  <div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.query" placeholder="项目公司、施工单位搜索" clearable style="width:300px;" />
          </el-form-item>
          <el-form-item prop="status" label="验收状态：" style="margin: 0 30px">
            <el-radio-group v-model="tableInfo.status">
              <el-radio-button :label="undefined">全部</el-radio-button>
              <el-radio-button :label="3">施工中</el-radio-button>
              <el-radio-button :label="5">验收待审核</el-radio-button>
              <el-radio-button :label="7">已通过</el-radio-button>
              <el-radio-button :label="6">已驳回</el-radio-button>
              <el-radio-button :label="10">终审驳回</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <slot name="leftFormArea" :tableInfo="tableInfo" />
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <slot name="rightOprArea" />
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="projectId" label="项目ID" width="150" />
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="buildUserName" label="施工单位" />
        <el-table-column prop="elementStatus" label="组件安装" width="100">
          <template slot-scope="scope">
            <span :class="'done-' + scope.row.elementStatus">{{ scope.row.elementStatus | buildStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cableStatus" label="线缆安装" width="100">
          <template slot-scope="scope">
            <span :class="'done-' + scope.row.cableStatus">{{ scope.row.cableStatus | buildStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="inverterStatus" label="逆变器安装" width="100">
          <template slot-scope="scope">
            <span :class="'done-' + scope.row.inverterStatus">{{ scope.row.inverterStatus | buildStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="connectionLandStatus" label="防雷接地安装" width="100">
          <template slot-scope="scope">
            <span :class="'done-' + scope.row.connectionLandStatus">{{ scope.row.connectionLandStatus | buildStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="初审验收" width="100">
          <template slot-scope="scope">
            <span :class="'done-status-' + scope.row.status">{{ scope.row.status | buildStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
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
import { getProjectExamineList } from '@/api/listProject/index'

export default {
  name: 'BuilderTeamTable',
  filters: {
    buildStatus(status) {
      switch (status) {
        case 0:
          return '施工中'
        case 1:
          return '待审核'
        case 2:
          return '已通过'
        case 3:
          return '已驳回'
        case 4:
          return '终审驳回'
        default:
          return 'unknow'
      }
    }
  },
  data() {
    return {
      tableInfo: {
        query: '',
        status: undefined
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      total: null
    }
  },
  created() {
    this.$emit('init', this.tableInfo)
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      const { query, ...resetTableInfo } = this.tableInfo
      const param = { ...resetTableInfo, ...this.queryInfo, companyName: query, buildName: query }
      getProjectExamineList(param).then(res => {
        // console.log(res)
        const { current, records, total } = res.data
        this.tableData = records.map((v) => {
          const { status } = v
          if (status === 3 || status === 4) {
            v.status = 0
          } else if (status === 5) {
            v.status = 1
          } else if (status === 6) {
            v.status = 3
          } else if (status === 10) {
            v.status = 4
          } else if (status >= 7) {
            v.status = 2
          } else {
            v.status = 0
          }
          return v
        })

        this.currentPage = current
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      console.log('=====', this.tableInfo)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: '',
        status: undefined
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10
      }
      this.$emit('reset', this.tableInfo)
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'projectSupervisionDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
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
.done-status-1 {
  color: #F59A23;
}
.done-status-2 {
  color: #70B603;
}
.done-status-3, .done-status-4 {
  color: #D9001B;
}
</style>
