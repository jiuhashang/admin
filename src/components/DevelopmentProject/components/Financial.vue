<template>
  <el-card>
    <h3>财务情况</h3>
    <el-form ref="ruleForm" label-width="100px" :disabled="disabled" :model="companyFinanceInfo" class="demo-ruleForm" label-position="top">
      <el-form-item prop="projectInvestmentEvaluation">
        <file-upload-string v-model="companyFinanceInfo.propertyFile" :limit="1" accept=".xls,.pdf,.xlsx" required @change="validField('propertyFile')">《合并资产负债表》（限Excel、PDF文件）</file-upload-string>
      </el-form-item>
      <el-form-item prop="projectInvestmentCommittee">
        <file-upload-string v-model="companyFinanceInfo.profixFile" :limit="1" accept=".xls,.pdf,.xlsx" required @change="validField('profixFile')">《合并利润表》（限Excel、PDF文件）</file-upload-string>
      </el-form-item>
      <el-form-item prop="projectInvestmentCommittee">
        <file-upload-string v-model="companyFinanceInfo.cashFile" :limit="1" accept=".xls,.pdf,.xlsx" required @change="validField('cashFile')">《合并现金流量表》（限Excel、PDF文件）</file-upload-string>
      </el-form-item>
      <el-form-item prop="projectInvestmentCommittee">
        <file-upload-string v-model="companyFinanceInfo.taxReportFile" :limit="1" accept=".xls,.pdf,.xlsx" required @change="validField('taxReportFile')">《纳税申报表》（限Excel、PDF文件）</file-upload-string>
      </el-form-item>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="editFinance">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectCompanyFinanceInfo } from '@/api/developmentProject'
export default {
  inject: ['refreshing'],
  props: {
    seProjectCompanyFinanceInfo: {
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
      companyFinanceInfo: {},
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
    seProjectCompanyFinanceInfo(oldVal, newVal) {
      this.companyFinanceInfo = oldVal
    }
  },
  methods: {
    // 财务情况
    editFinance() {
      if (this.submiting) { return }
      this.submiting = true
      this.companyFinanceInfo.projectId = this.$route.query.projectId
      setProjectCompanyFinanceInfo(this.companyFinanceInfo).then(res => {
        this.$message.success(res.msg)
        if (!this.companyFinanceInfo.businessId) {
          this.$emit('saveRefresh', 'seProjectCompanyFinanceInfo')
        }
      }).finally(() => {
        this.submiting = false
      })
    },
    validField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
