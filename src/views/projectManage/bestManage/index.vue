<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="messageUploadStatus" label="录入状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.dueDiligenceStatus">
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
            <span class="done-status" :class="{'done': scope.row.dueDiligenceStatus === 1}">{{ scope.row.dueDiligenceStatus | dueDiligenceStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">{{ scope.row.dueDiligenceStatus === 0 ? '录入' : '查看' }}</el-button>
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
  name: 'BestManage',
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
      console.log('=================', arg0)
    },
    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'bestManageDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
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
