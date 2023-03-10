<template>
  <div>
    <!-- 审核操作区域 -->
    <detail-title>
      <template slot="btn">
        <el-button v-if="showBtnArea" type="danger" @click="handleDenyClickEvent">验收驳回</el-button>
        <el-button v-if="showBtnArea" type="primary" @click="dialogPassVisible=true">验收通过</el-button>
        <el-button v-if="showCheckBtn" type="primary" @click="openBuildPointCheckDialog">施工过程审批</el-button>
      </template>
    </detail-title>

    <!-- 主页面区域 -->
    <project-supvision :use-self="false" :data-source="detailInfo" />

    <!-- 节点审批弹窗 -->
    <el-dialog title="施工过程弹窗" :visible.sync="dialogBuildVisible" :close-on-click-modal="false" width="500px">
      <el-row class="buidld-point-row">
        <el-col :span="12">组件安装</el-col>
        <el-col :span="12">
          <build-point-check :status="seProjectBuildElementStatus" @check="handleBuildPointCheckEvent($event, 0)" />
        </el-col>
      </el-row>
      <el-row class="buidld-point-row">
        <el-col :span="12">线缆安装</el-col>
        <el-col :span="12">
          <build-point-check :status="seProjectBuildCableStatus" @check="handleBuildPointCheckEvent($event, 1)" />
        </el-col>
      </el-row>
      <el-row class="buidld-point-row">
        <el-col :span="12">逆变器与采集器安装</el-col>
        <el-col :span="12">
          <build-point-check :status="seProjectBuildInverterStatus" @check="handleBuildPointCheckEvent($event, 2)" />
        </el-col>
      </el-row>
      <el-row class="buidld-point-row">
        <el-col :span="12">防雷接地</el-col>
        <el-col :span="12">
          <build-point-check :status="seProjectBuildConnectionLandStatus" @check="handleBuildPointCheckEvent($event, 3)" />
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 审核通过 -->
    <el-dialog title="上传施工验收报告" :visible.sync="dialogPassVisible" :close-on-click-modal="false" width="500px">
      <p class="pass-p">通过审核前需要上传施工验收报告（最多5张）</p>
      <image-upload-string v-model="examineReportImage" :limit="5" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="handleCheckPassBtnClick">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import ProjectSupvision from '@/components/ProjectSupervision/ProjectSupvision.vue'
import BuildPointCheck from '@/components/ProjectSupervision/BuildPointCheck.vue'
import { updateProjectExamineStatus, getProjectExamineDetailInfo, updateProjectBuildElementStatus } from '@/api/listProject/index'
import { Message, MessageBox } from 'element-ui'
import throttle from 'lodash/throttle'
import delay from 'lodash/delay'

export default {
  components: { DetailTitle, ProjectSupvision, BuildPointCheck },
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
      if (this.projectStatus && [5, 10].includes(this.projectStatus)) {
        return true
      }
      return false
    },
    showCheckBtn() {
      if (this.projectStatus && [3, 6].includes(this.projectStatus)) {
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
    // 验收驳回
    handleDenyClickEvent() {
      MessageBox.prompt('', '请填写驳回理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,50}/,
        inputErrorMessage: '请输入1到50字的驳回理由',
        showClose: false,
        closeOnClickModal: false
      }).then(({ value }) => {
        this.sendCheckAjax({
          type: 1, remark: value
        })
          .then(() => {
            Message({
              type: 'success',
              message: '审核驳回成功'
            })
            this.backToTrialProjectPage()
          })
      }).catch(() => {})
    },
    // 验收通过
    handleCheckPassBtnClick: throttle(function() {
      console.log(this.examineReportImage, '22222')
      if (!this.examineReportImage) {
        Message({
          type: 'error',
          message: '图片信息不能为空'
        })
        return
      }
      if (this.submitLoading) { return }
      this.submitLoading = true
      this.sendCheckAjax({
        type: 0, examineReportImage: this.examineReportImage
      })
        .then(() => {
          Message({
            type: 'success',
            message: '审核通过成功'
          })
          this.backToTrialProjectPage()
          this.dialogPassVisible = false
        })
        .finally(() => {
          this.submitLoading = false
        })
    }, 50),
    // 节点审批
    handleBuildPointCheckEvent(examineType, type) {
      console.log(...arguments)
      updateProjectBuildElementStatus({
        projectId: this.projectId, examineType, type
      }).then(() => {
        const pass = examineType === 0
        const nextStatus = pass ? 2 : 0
        Message({
          type: 'success',
          message: `节点审核${pass ? '通过' : '驳回'}成功`
        })
        switch (type) {
          case 0:
            this.seProjectBuildElementStatus = nextStatus
            break
          case 1:
            this.seProjectBuildCableStatus = nextStatus
            break
          case 2:
            this.seProjectBuildInverterStatus = nextStatus
            break
          case 3:
            this.seProjectBuildConnectionLandStatus = nextStatus
            break
          default:
            break
        }
      })
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
      return updateProjectExamineStatus({
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
          status
        } = data
        this.seProjectBuildCableStatus = seProjectBuildCable?.status ?? this.seProjectBuildCableStatus
        this.seProjectBuildInverterStatus = seProjectBuildInverter?.status ?? this.seProjectBuildInverterStatus
        this.seProjectBuildConnectionLandStatus = seProjectBuildConnectionLand?.status ?? this.seProjectBuildConnectionLandStatus
        this.seProjectBuildElementStatus = seProjectBuildElement?.status ?? this.seProjectBuildElementStatus
        this.projectStatus = status
      })
    },
    backToTrialProjectPage() {
      delay(() => {
        this.$router.push({ name: 'projectSupervision' })
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
      }
    }
  }
}
</style>
