<template>
  <el-card>
    <h3>生产情况</h3>
    <el-form ref="ruleForm" :rules="businessInfoRules" :disabled="disabled" :model="companyBusinessInfo" label-width="100px" class="demo-ruleForm" label-position="top">
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="厂房建造情况（限300字内）" prop="houseBuildMessage">
            <el-input v-model="companyBusinessInfo.houseBuildMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="工厂工作时间" prop="workTime">
            <el-input v-model="companyBusinessInfo.workTime" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="节假日生产情况" prop="holidayWorkMessage">
            <el-input v-model="companyBusinessInfo.holidayWorkMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车间生产情况" prop="carRoomWorkMessage">
            <el-input v-model="companyBusinessInfo.carRoomWorkMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="碳排放情况">
            <el-input v-model="companyBusinessInfo.carbonOutMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="近1年电费结算单（最多5张）" prop="nearYearPowerRateImage">
            <image-upload-string v-model="companyBusinessInfo.nearYearPowerRateImage" :limit="5" fit="fill" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="addBusinessInfo">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectCompanyBusinessInfo } from '@/api/developmentProject'

export default {
  inject: ['refreshing'],
  props: {
    seProjectCompanyBusinessInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      companyBusinessInfo: {},
      businessInfoRules: {
        houseBuildMessage: [
          { required: true, message: '请输入厂房建造情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        workTime: [
          { required: true, message: '请输入工厂工作时间', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        holidayWorkMessage: [
          { required: true, message: '请输入节假日生产情况', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        carRoomWorkMessage: [
          { required: true, message: '请输入车间生产情况', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        nearYearPowerRateImage: [{ required: true, message: '请上传近1年电费结算单', trigger: 'blur' }]
      },
      submiting: false
    }
  },
  computed: {
    btnLoading() {
      console.log(this)
      return this.refreshing.value || this.submiting || false
    }
  },
  watch: {
    seProjectCompanyBusinessInfo(oldVal, newVal) {
      this.companyBusinessInfo = oldVal
    }
  },
  methods: {
    // 生产情况
    addBusinessInfo() {
      if (this.submiting) { return }
      this.submiting = true
      this.companyBusinessInfo.projectId = this.$route.query.projectId
      setProjectCompanyBusinessInfo(this.companyBusinessInfo).then(res => {
        this.$message.success(res.msg)
        if (!this.companyBusinessInfo.businessId) {
          this.$emit('saveRefresh', 'seProjectCompanyBusinessInfo')
        }
      }).finally(() => {
        this.submiting = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
