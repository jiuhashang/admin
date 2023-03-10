<template>
  <div>
    <detail-title>
      <template v-if="disabled = status == 0 || status == 2" slot="btn">
        <el-button plain @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="submit">保存</el-button>
      </template>
    </detail-title>
    <basic-info />
    <technical-eva ref="teRef" :status="status" />

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
// import { getDetail } from '@/api/listProject/index'

import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo'
import TechnicalEva from '@/components/TechnicalEva/TechnicalEva.vue'
import throttle from 'lodash/throttle'

import { Message } from 'element-ui'
export default {
  components: {
    DetailTitle,
    BasicInfo,
    TechnicalEva
  },
  data() {
    return {
      projectId: '',
      createUser: '',
      obj: {},
      disabled: false,
      status: undefined,
      dialogVisible: false,
      loading: false
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.createUser = this.$route.query.createUser
    this.status = this.$route.query.status
    // this.getCurrentRecordInfomation()
  },
  methods: {
    // getCurrentRecordInfomation() {
    //   const { projectId } = this.$route.query
    //   getDetail({ projectId }).then((res) => {
    //     const projectStatus = res?.data?.status
    //     const disabled = projectStatus === 0 || projectStatus === 2
    //     this.disabled = disabled
    //   })
    // },
    submit: throttle(function() {
      this.dialogVisible = false
      this.loading = true
      this.$refs.teRef.validateForm((valid, res) => {
        if (valid) {
          console.log('技术评估表单获取: ', res)
          this.$refs.teRef.submitForm(res, () => {
            this.$refs.teRef?.refresh(() => {
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
    }, 1000),
    saveBack() {
      this.dialogVisible = false
      this.$refs.teRef.validateForm((valid, res) => {
        if (valid) {
          console.log('技术评估表单获取: ', res)
          this.$refs.teRef.submitForm(res)
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
    margin:20px;
}
</style>
