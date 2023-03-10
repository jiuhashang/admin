<template>
  <div>
    <!-- 审核操作区域 -->
    <detail-title>
      <template v-if="showBtnArea" slot="btn">
        <el-button type="danger" @click="handleDenyClickEvent">审核驳回</el-button>
        <el-button type="primary" @click="handleCheckPassBtnClick">审核通过</el-button>
      </template>
    </detail-title>

    <!-- 主页面区域 -->
    <project-supvision :use-self="false" :data-source="detailInfo" />

    <!-- 验收报告 -->
    <el-card>
      <h3>验收报告</h3>
      <p>验收报告</p>
      <image-upload-string :file-list="examineReportImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import ProjectSupvision from '@/components/ProjectSupervision/ProjectSupvision.vue'
// import BuildPointCheck from '@/components/ProjectSupervision/BuildPointCheck.vue'
import { updateProjectExamineStatusByAdmin, getProjectExamineDetailInfo } from '@/api/listProject/index'
import { Message, MessageBox } from 'element-ui'
import delay from 'lodash/delay'

export default {
  components: { DetailTitle, ProjectSupvision },
  data() {
    return {
      projectId: undefined,
      detailInfo: undefined,
      projectStatus: undefined,

      dialogBuildVisible: false, // 施工节点审批弹窗
      seProjectBuildCableStatus: undefined, // 线缆
      seProjectBuildInverterStatus: undefined, // 逆变器
      seProjectBuildConnectionLandStatus: undefined, // 接地
      seProjectBuildElementStatus: undefined, // 组件

      dialogPassVisible: false,
      examineReportImage: '', // 审核通过图片信息
      submitLoading: false
    }
  },
  computed: {
    showBtnArea() {
      if (this.projectStatus && [7].includes(this.projectStatus)) {
        return true
      }
      return false
    }
  },
  created() {
    const { projectId } = this.$route.query
    this.projectId = +projectId
    this.getDetailInfo()
  },
  methods: {
    // 驳回
    handleDenyClickEvent() {
      MessageBox.confirm('是否将项目驳回到验收初审？', '', {
        confirmButtonText: '驳回',
        cancelButtonText: '取消',
        showClose: false,
        closeOnClickModal: false
      }).then(() => {
        this.sendCheckAjax({
          type: 1
        })
          .then(() => {
            Message({
              type: 'success',
              message: '验收已审核驳回'
            })
            this.backToTrialProjectPage()
          })
      }).catch(() => {})
    },
    // 验收通过
    handleCheckPassBtnClick() {
      MessageBox.confirm('审核通过后，将进行并网信息录入，是否继续？', '', {
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        showClose: false,
        closeOnClickModal: false
      }).then(() => {
        this.sendCheckAjax({
          type: 0
        })
          .then(() => {
            Message({
              type: 'success',
              message: '验收已审核通过'
            })
            this.backToTrialProjectPage()
          })
      }).catch(() => {})
    },

    // 打开施工过程审批 的弹窗
    openBuildPointCheckDialog() {
      const { seProjectBuildCableStatus, seProjectBuildInverterStatus, seProjectBuildConnectionLandStatus, seProjectBuildElementStatus } = this
      if (typeof (seProjectBuildCableStatus ?? seProjectBuildInverterStatus ?? seProjectBuildConnectionLandStatus ?? seProjectBuildElementStatus) !== 'number') {
        Message({
          type: 'warning',
          message: '施工节点信息未加载, 请刷新后再试'
        })
        return
      }
      this.dialogBuildVisible = true
    },
    sendCheckAjax(params) {
      return updateProjectExamineStatusByAdmin({
        projectId: this.projectId,
        ...params
      })
    },
    getDetailInfo() {
      getProjectExamineDetailInfo({ projectId: this.projectId }).then(({ data }) => {
        console.log('监管详情:', data)
        this.detailInfo = data
        const {
          seProjectBuildCable,
          seProjectBuildInverter,
          seProjectBuildConnectionLand,
          seProjectBuildElement,
          status,
          estimateReportImage: examineReportImage
        } = data
        this.seProjectBuildCableStatus = seProjectBuildCable?.status ?? this.seProjectBuildCableStatus
        this.seProjectBuildInverterStatus = seProjectBuildInverter?.status ?? this.seProjectBuildInverterStatus
        this.seProjectBuildConnectionLandStatus = seProjectBuildConnectionLand?.status ?? this.seProjectBuildConnectionLandStatus
        this.seProjectBuildElementStatus = seProjectBuildElement?.status ?? this.seProjectBuildElementStatus
        this.projectStatus = status
        this.examineReportImage = examineReportImage ?? this.examineReportImage
      })
    },
    backToTrialProjectPage() {
      delay(() => {
        this.$router.push({ name: 'auditAcceptance' })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;

  ::v-deep .el-card__body > p {
    margin-bottom: 6px;
    font-size: 14px;
    color: #666;
  }
}

.pass-p {
  margin-top: 0;
  color: #999;
}

.buidld-point-row {
  height: 32px;
  line-height: 32px;
  margin: 20px 0;
  background-color: #efefef;

  & > div:first-child {
    text-indent: 14px;
    color: #333;
  }
  & > div:last-child {
    text-align: right;
  }
}

::v-deep {
  .el-table {
    margin-bottom: 32px;
  }

  .custom-upload-images {
    .el-upload-list.el-upload-list--picture-card.is-disabled + div {
      display: none;
    }
    .el-upload-list.el-upload-list--picture-card.is-disabled:empty + div {
      display: block;

      &:hover, &:focus {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
      }

      i.el-icon-plus:before {
        content: "暂无";
        font-size: 14px;
      }
    }
  }
}
</style>
