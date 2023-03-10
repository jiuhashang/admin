<template>
  <el-form ref="ruleForm" label-width="100px" disabled class="demo-ruleForm" label-position="top">
    <el-card>
      <h3>安全教育</h3>
      <p>安全措施</p>
      <image-upload-string :file-list="buildReadySafeStepImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
      <p>安全教育</p>
      <image-upload-string :file-list="buildReadySafeTeachImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>
    <el-card class="hidden-upload-btn">
      <h3>相关文件</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="rentContractFile">
            <file-upload-string :file-list="seProjectBuildReady.safeAgreement" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
              安全协议
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="rentContractFile">
            <file-upload-string :file-list="seProjectBuildReady.buildPlanName" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
              施工方案
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="rentContractFile">
            <file-upload-string :file-list="seProjectBuildReady.startReportName" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
              开工报告
            </file-upload-string>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script>
import { getProjectExamineDetailInfo } from '@/api/listProject'
export default {
  data() {
    return {
      // seProjectBuildReadySafeStepList: [],
      // seProjectBuildReadySafeTeachList: [],
      seProjectBuildReady: '',
      buildReadySafeStepImage: '',
      buildReadySafeTeachImage: ''
    }
  },
  created() {
    const projectId = this.$route.query.projectId
    this.getProjectExamineDetailInfo(projectId)
  },
  methods: {
    getProjectExamineDetailInfo(projectId) {
      getProjectExamineDetailInfo({ projectId }).then(res => {
        const { seProjectBuildReadySafeStepList, seProjectBuildReadySafeTeachList, seProjectBuildReady } = res.data
        this.buildReadySafeStepImage = seProjectBuildReadySafeStepList?.map(({ imageUrl }) => imageUrl).join(',') ?? this.buildReadySafeStepImage
        this.buildReadySafeTeachImage = seProjectBuildReadySafeTeachList?.map(({ imageUrl }) => imageUrl).join(',') ?? this.buildReadySafeTeachImage
        if (seProjectBuildReady) { this.seProjectBuildReady = seProjectBuildReady	 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.hidden-upload-btn {
  ::v-deep button.is-disabled {
    display: none;
  }
}
::v-deep {
  .custom-upload-images {
    .el-upload-list.el-upload-list--picture-card.is-disabled + div {
      display: none !important;
    }
    .el-upload-list.el-upload-list--picture-card.is-disabled:empty + div {
      display: block !important;
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
