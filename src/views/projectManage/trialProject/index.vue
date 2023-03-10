<template>
  <div>
    <list-title />
    <list-project-table ref="tableForm" @init="handlerForm" @reset="handlerForm">
      <template slot="leftFormArea" slot-scope="scope">
        <el-form-item prop="messageUploadStatus" label="审核状态：" style="margin: 0 60px">
          <el-radio-group v-model="scope.tableInfo.messageUploadStatus">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="0">初审待审核</el-radio-button>
            <el-radio-button :label="1">初审驳回</el-radio-button>
            <el-radio-button :label="2">银行待审核</el-radio-button>
            <el-radio-button :label="3">银行驳回</el-radio-button>
            <el-radio-button :label="4">银行通过</el-radio-button>
            <el-radio-button :label="5">强制通过</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="tableRow">
        <el-table-column prop="companyName" label="项目公司" />
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="createUser" label="业务员" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="messageInputSubmitTime" label="提交时间" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="'done-status-' + scope.row.messageUploadStatus">
              {{ scope.row.messageUploadStatus | messageUploadStatus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
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
    ListTitle, ListProjectTable
  },
  data() {
    return {}
  },
  activated() {
    this.$refs.tableForm.getList()
  },
  methods: {
    // 重置表单
    handlerForm(form) {
      console.log('messageUploadStatus receive: ', form)
      this.$set(form, 'messageUploadStatus', undefined)
      this.$set(form, 'projectType', 1) // 项目节点：projectType: 0:全部 1：待审核之后；2：录入审核通过后(银行通过；后台强制通过) 3:初审通过后
    },
    handleView(row) {
      this.$router.push({ name: 'trialProjectDetail', query: {
        projectId: row.projectId,
        createTime: row.createTime,
        createUser: row.createUser
      }})
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
.done-status-1, .done-status-2, .done-status-3 {
  color: #B8741A;
}
.done-status-4, .done-status-5 {
  color: #70B603;
}
</style>
