<template>
  <div>
    <detail-title>
      <template v-if="!disabled" slot="btn">
        <el-button plain @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submit">保存</el-button>
      </template>
    </detail-title>

    <!-- 基本信息 -->
    <basic-info />

    <c-tabs>
      <el-tab-pane label="尽调信息" name="first">
        <best-manage-component ref="bestManageRef" :disabled="disabled" />
      </el-tab-pane>

      <el-tab-pane label="发电预估" name="second">
        <best-manage-base-info-component :disabled="disabled" @estimate="handleTableDataChange($event)" />
        <estimate-info-table :use-self="false" :data-source="estimateData" />
      </el-tab-pane>
    </c-tabs>
    <!-- 取消提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :close-on-click-modal="false" width="30%">
      <span>如果离开页面，已修改信息是否需要保存？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="saveBack">保存并离开</el-button>
        <el-button type="primary" @click="handleBack">直接返回</el-button>
        <el-button type="info" plain @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo/index.vue'
import { getDetail } from '@/api/listProject/index'
import BestManageComponent from '@/components/BestManage/BestManage.vue'
import EstimateInfoTable from '@/components/BestManage/EstimateInfoTable.vue'
import BestManageBaseInfoComponent from '@/components/BestManage/BaseInfo.vue'
import { Message } from 'element-ui'
import throttle from 'lodash/throttle'

export default {
  components: {
    DetailTitle, BasicInfo, BestManageComponent, EstimateInfoTable, BestManageBaseInfoComponent
  },
  data() {
    return {
      size: 'small',
      activeName: 'first',
      estimateData: undefined,
      disabled: true,
      loading: false,
      dialogVisible: false
    }
  },
  created() {
    this.getCurrentRecordInfomation()
  },
  methods: {
    handleTableDataChange(estimateData) {
      this.estimateData = estimateData
    },
    getCurrentRecordInfomation() {
      const { projectId } = this.$route.query
      getDetail({ projectId }).then((res) => {
        const projectStatus = res?.data?.status
        this.disabled = !(projectStatus === 0 || projectStatus === 2)
      })
    },
    submit: throttle(function() {
      this.loading = true
      this.$refs.bestManageRef.validateForm((valid, res) => {
        if (valid) {
          console.log('尽调表单获取: ', res)
          this.$refs.bestManageRef.submitForm(res, () => {
            this.$refs.bestManageRef?.refresh(() => {
              this.loading = false
            })
          })
        } else {
          console.log('error submit!!', res)
          Message({
            message: '请先完善表单',
            type: 'warn'
          })
          this.loading = false
          return false
        }
      })
    }, 200),
    saveBack() {
      this.dialogVisible = false
      this.$refs.bestManageRef.validateForm((valid, res) => {
        if (valid) {
          console.log('技术评估表单获取: ', res)
          this.$refs.bestManageRef.submitForm(res)
          this.$router.back()
        } else {
          console.log('error submit!!', res)
          Message({
            message: '请先完善表单',
            type: 'warn'
          })
          return false
        }
      })
    },
    console() {
      console.log(...arguments, this.ruleForm)
    },
    handleCancel() {
      this.dialogVisible = true
    },
    handleBack() {
      this.dialogVisible = false
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 20px;
}
</style>
