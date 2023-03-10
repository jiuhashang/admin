<template>
  <div>
    <!-- 审核操作区域 -->
    <detail-title>
      <template slot="btn">
        <el-button v-if="showDenyBtn" :loading="denyLoading" type="danger" @click="handleDenyClickEvent">审核驳回</el-button>
        <el-button v-if="showForceApproveBtn" :loading="forceLoading" type="primary" @click="handleTrailSuccessForceClickEvent">强制审核通过</el-button>
        <el-button v-if="showApproveBtn" :loading="approveLoading" type="primary" @click="handleTrailSuccessClickEvent">审核通过, 提交至银行端</el-button>
      </template>
    </detail-title>

    <div v-if="showTips" style="margin:20px;">
      <el-alert title="当前银行未审核，初审通过后将提交给银行进行二次审核。" type="success" :closable="false" />
    </div>

    <!-- 基本信息 -->
    <basic-info :project-id="'' + projectId" :create-time="projectInfo && projectInfo.createTime" :create-user="projectInfo && projectInfo.createUser" />

    <!-- tabs标签 -->
    <c-tabs v-model="activeName" type="card">
      <el-tab-pane label="项目开发" name="first1">
        <development-project :disabled="true" :is-show="true" />
      </el-tab-pane>
      <el-tab-pane label="技术评估" name="first2">
        <technical-eva :disabled="true" />
      </el-tab-pane>
      <el-tab-pane label="尽调信息" name="first3">
        <best-manage-component ref="bestManageRef" :disabled="true" />
      </el-tab-pane>
      <el-tab-pane label="发电预估" name="first4">
        <estimate-info-table :use-self="true" />
      </el-tab-pane>
    </c-tabs>

  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo/index.vue'
import { getDetail, updateProjectStatus } from '@/api/listProject/index'
import { MessageBox, Message } from 'element-ui'
import delay from 'lodash/delay'
import BestManageComponent from '@/components/BestManage/BestManage.vue'
import EstimateInfoTable from '@/components/BestManage/EstimateInfoTable.vue'
import DevelopmentProject from '@/components/DevelopmentProject/DevelopmentProject.vue'
import TechnicalEva from '@/components/TechnicalEva/TechnicalEva.vue'

export default {
  components: {
    DetailTitle, BasicInfo, BestManageComponent, EstimateInfoTable, TechnicalEva, DevelopmentProject
  },
  // name: "VueAdminTemplateIndex",
  data() {
    return {
      activeName: 'first1',
      projectInfo: null,
      projectId: '',
      denyLoading: false,
      approveLoading: false,
      forceLoading: false
    }
  },
  computed: {
    showTips() {
      const status = this.projectInfo?.messageUploadStatus
      if (status === 0 || status === 1) {
        return true
      }
      return false
    },
    showDenyBtn() {
      const status = this.projectInfo?.messageUploadStatus
      if (status === 0 || status === 3) {
        return true
      }
      return false
    },
    showApproveBtn() {
      const status = this.projectInfo?.messageUploadStatus
      if (status === 0 || status === 3) {
        return true
      }
      return false
    },
    showForceApproveBtn() {
      const status = this.projectInfo?.messageUploadStatus
      if (status === 0 || status === 3) {
        return true
      }
      return false
    }
  },
  created() {
    const { projectId } = this.$route.query
    this.projectId = projectId
    this.getProjectInfo(projectId)
  },
  methods: {
    backToTrialProjectPage() {
      delay(() => {
        this.$router.push({ name: 'trialProject' })
      }, 1000)
    },
    getProjectInfo(projectId) {
      getDetail({ projectId }).then(res => {
        this.projectInfo = res?.data || null
      })
    },
    // 审核驳回
    handleDenyClickEvent() {
      MessageBox.prompt('', '请填写驳回理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '输入内容不能为空',
        showClose: false,
        closeOnClickModal: false
      }).then(({ value }) => {
        if (this.denyLoading) {
          return
        }
        this.denyLoading = true
        this.$nextTick(() => {
          this.updateProjectStatus(1, value)
            .then(() => {
              Message({
                type: 'success',
                message: '审核已驳回'
              })
              this.backToTrialProjectPage()
            })
            .finally(() => {
              this.denyLoading = false
            })
        })
      })
    },
    // 审核通过,提交至银行端
    handleTrailSuccessClickEvent() {
      if (this.approveLoading) {
        return
      }
      this.approveLoading = true
      this.$nextTick(() => {
        this.updateProjectStatus(0)
          .then(() => {
            Message({
              type: 'success',
              message: '项目信息已审核通过，请等待银行二次审核'
            })
            this.backToTrialProjectPage()
          })
          .finally(() => {
            this.approveLoading = false
          })
      })
    },
    // 强制审核通过
    handleTrailSuccessForceClickEvent() {
      if (this.forceLoading) {
        return
      }
      this.forceLoading = true
      this.$nextTick(() => {
        this.updateProjectStatus(2)
          .then(() => {
            Message({
              type: 'success',
              message: '项目已强制审核通过，该项目可进行项目准备'
            })
            this.backToTrialProjectPage()
          })
          .finally(() => {
            this.forceLoading = false
          })
      })
    },
    // 更新审核状态
    updateProjectStatus(status, remark = '') {
      return updateProjectStatus({ type: status, projectId: this.projectId, remark })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
