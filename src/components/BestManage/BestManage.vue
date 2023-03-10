<template>
  <el-form ref="ruleForm" :disabled="disabled" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" label-position="top">
    <el-card>
      <h3>历史沿革</h3>
      <el-form-item label="公司设立（限300字以内）" prop="setMessage" class="must-form-item">
        <el-input v-model="ruleForm.setMessage" :max="300" />
      </el-form-item>
      <el-form-item label="历史变更（限300字以内）" prop="changeMessage" class="must-form-item">
        <el-input v-model="ruleForm.changeMessage" :max="300" />
      </el-form-item>
      <el-form-item label="细分行业概述（限3000字以内）" prop="tradeDescribe" class="must-form-item">
        <el-input v-model="ruleForm.tradeDescribe" type="textarea" :max="3000" />
      </el-form-item>
      <el-form-item label="行业地位（限3000字以内）" prop="tradePosition">
        <el-input v-model="ruleForm.tradePosition" type="textarea" :max="3000" />
      </el-form-item>
      <el-form-item label="主要产品（限3000字以内）" prop="productDescribe">
        <el-input v-model="ruleForm.productDescribe" type="textarea" :max="3000" />
      </el-form-item>
      <el-form-item label="股权质押情况（限300字以内）" prop="sharePledgeMessage">
        <el-input v-model="ruleForm.sharePledgeMessage" :max="300" />
      </el-form-item>
      <el-form-item label="公司最近三年对外担保情况（限300字以内）" prop="outWarrant">
        <el-input v-model="ruleForm.outWarrant" :max="300" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="知识产权（限5张以内）" prop="knowledgePropertRightImage">
            <image-upload-string v-model="ruleForm.knowledgePropertRightImage" :limit="5" fit="fill" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="抽查抽检（限3张以内）" prop="spotCheckImage">
            <image-upload-string v-model="ruleForm.spotCheckImage" :limit="3" fit="fill" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="行政处罚（限3张以内）" prop="administrationPunishImage">
            <image-upload-string v-model="ruleForm.administrationPunishImage" :limit="3" fit="fill" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营异常（限3张以内）" prop="businessUnusualImage">
            <image-upload-string v-model="ruleForm.businessUnusualImage" :limit="3" fit="fill" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <h3>公司大股东、实际控制人及关联方</h3>
      <el-alert title="* 根据证监会对关联方认定的标准，拟上市公司的控股股东，持股 5%以上的其他股东，公司董事、监事、高级管理人员及其控制的法人实体等都可能会被认定为关联方" type="success" :closable="false" />
      <!-- <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top"> -->
      <el-form-item label="大股东、实际控制人情况（限3张以内）" prop="shareholdersImage" class="must-form-item">
        <image-upload-string v-model="ruleForm.shareholdersImage" :limit="3" fit="fill" />
      </el-form-item>
      <!-- </el-form> -->

      <relation-info ref="relationInfo" v-model="ruleForm" :disabled="disabled" class="must-form-item" />
    </el-card>

    <el-card>
      <h3>财务情况</h3>
      <el-form-item label="其他说明（限300字以内）" prop="financeMessage">
        <el-input v-model="ruleForm.financeMessage" :max="300" />
      </el-form-item>
      <h3>偿债能力分析</h3>
      <solvency-analysis v-model="ruleForm" class="must-form-item" />

      <h3>运营能力分析</h3>
      <operational-analysis v-model="ruleForm" class="must-form-item" />

      <h3>盈利能力分析</h3>
      <profitability-analysis v-model="ruleForm" class="must-form-item" />

      <h3>成长能力分析</h3>
      <growth-analysis v-model="ruleForm" class="must-form-item" />

      <h3>文件上传</h3>

      <el-form-item prop="projectInvestmentEvaluation" class="must-form-item">
        <file-upload-string
          v-model="ruleForm.projectInvestmentEvaluation"
          :limit="1"
          accept=".doc,.docx,.pdf"
          required
        >
          《分布式光伏电站项目投资评估表》（限Word、PDF文件）
        </file-upload-string>
      </el-form-item>

      <el-form-item prop="projectInvestmentCommittee" class="must-form-item">
        <file-upload-string
          v-model="ruleForm.projectInvestmentCommittee"
          :limit="1"
          accept=".doc,.docx,.pdf"
          required
        >《分布式光伏电站项目投委会决议》（限Word、PDF文件）</file-upload-string>
      </el-form-item>

      <el-form-item prop="projectInvestmentProfit" class="must-form-item">
        <file-upload-string
          v-model="ruleForm.projectInvestmentProfit"
          :limit="1"
          accept=".xls,.pdf,.xlsx"
          required
        >《投资收益评测算表》（限Excel、PDF文件）</file-upload-string>
      </el-form-item>
    </el-card>

  </el-form>
</template>

<script>
import { Message } from 'element-ui'
import { getInformation, setInformation } from '@/api/listProject/index'
import RelationInfo from '@/components/Table/RelationInfo.vue'
import SolvencyAnalysis from '@/components/Table/SolvencyAnalysis.vue'
import OperationalAnalysis from '@/components/Table/OperationalAnalysis.vue'
import ProfitabilityAnalysis from '@/components/Table/ProfitabilityAnalysis.vue'
import GrowthAnalysis from '@/components/Table/GrowthAnalysis.vue'

export default {
  name: 'BestManageComponent',
  components: {
    RelationInfo, SolvencyAnalysis, OperationalAnalysis, ProfitabilityAnalysis,
    GrowthAnalysis
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 关联方
    const checkSeProjectCompanyDueDiligenceShareholderInfoList = (rule, value, callback) => {
      console.log(rule, value, callback)
      const keys = ['address', 'enterpriseName', 'legalPerson', 'registerMoney']
      const hasEmpty = value.filter(v => {
        return keys.some(key => !v[key])
      })
      if (hasEmpty.length) {
        callback(new Error('关联方信息未填写完整'))
        return
      }

      callback()
    }
    return {
      ruleForm: {
        setMessage: '',
        seProjectCompanyDueDiligenceShareholderInfoList: [],
        projectInvestmentCommittee: '',
        projectInvestmentEvaluation: '',
        projectInvestmentProfit: '',
        profixGrowScaleThirdYear: undefined,
        profixGrowScaleSecondYear: undefined,
        profixGrowScaleFirstYear: undefined,
        businessIncomeGrowScaleThirdYear: undefined,
        businessIncomeGrowScaleSecondYear: undefined,
        businessIncomeGrowScaleFirstYear: undefined,
        totalPropertyGrowScaleThirdYear: undefined,
        totalPropertyGrowScaleSecondYear: undefined,
        totalPropertyGrowScaleFirstYear: undefined,
        netPropertyScaleThirdYear: undefined,
        netPropertyScaleSecondYear: undefined,
        netPropertyScaleFirstYear: undefined,
        totalPropertyScaleThirdYear: undefined,
        totalPropertyScaleSecondYear: undefined,
        totalPropertyScaleFirstYear: undefined,
        sellProfixScaleThirdYear: undefined,
        sellProfixScaleSecondYear: undefined,
        sellProfixScaleFirstYear: undefined,
        businessCycleThirdYear: undefined,
        businessCycleSecondYear: undefined,
        businessCycleFirstYear: undefined,
        inventoryTurnoverThirdYear: undefined,
        inventoryTurnoverSecondYear: undefined,
        inventoryTurnoverFirstYear: undefined,
        receivableAccountTurnoverThirdYear: undefined,
        receivableAccountTurnoverSecondYear: undefined,
        receivableAccountTurnoverFirstYear: undefined,
        businessActivityCashFiowPriceThirdYear: undefined,
        businessActivityCashFiowPriceSecondYear: undefined,
        businessActivityCashFiowPriceFirstYear: undefined,
        interestCoverThirdYear: undefined,
        interestCoverSecondYear: undefined,
        interestCoverFirstYear: undefined,
        interestCostThirdYear: undefined,
        interestCostSecondYear: undefined,
        interestCostFirstYear: undefined,
        ebitdaThirdYear: undefined,
        ebitdaSecondYear: undefined,
        ebitdaFirstYear: undefined,
        profitThirdYear: undefined,
        profitSecondYear: undefined,
        profitFirstYear: undefined,
        propertyLiabilitiesScaleThirdYear: undefined,
        propertyLiabilitiesScaleSecondYear: undefined,
        propertyLiabilitiesScaleFirstYear: undefined,
        quickActionScaleSecondYear: undefined,
        quickActionScaleFirstYear: undefined,
        flowScaleThirdYear: undefined,
        flowScaleSecondYear: undefined,
        flowScaleFirstYear: undefined,
        financeMessage: '',
        shareholdersImage: '',
        businessUnusualImage: '',
        administrationPunishImage: '',
        spotCheckImage: '',
        knowledgePropertRightImage: '',
        outWarrant: '',
        sharePledgeMessage: '',
        productDescribe: '',
        tradePosition: '',
        tradeDescribe: '',
        changeMessage: '',
        projectId: undefined,
        dueDiligenceId: undefined
      },
      rules: {
        // setMessage: [
        //   { required: true, message: '公司设立信息不能为空', trigger: 'blur' },
        //   { max: 300, message: '长度在300个字符以内', trigger: 'blur' }
        // ],
        // changeMessage: [
        //   { required: true, message: '公司变更信息不能为空', trigger: 'blur' },
        //   { max: 300, message: '长度在300个字符以内', trigger: 'blur' }
        // ],
        // tradeDescribe: [
        //   { required: true, message: '细分行业概述信息不能为空', trigger: 'blur' },
        //   { max: 3000, message: '长度在3000个字符以内', trigger: 'blur' }
        // ],
        // tradePosition: [
        //   { max: 3000, message: '长度在3000个字符以内', trigger: 'blur' }
        // ],
        // productDescribe: [
        //   { max: 3000, message: '长度在3000个字符以内', trigger: 'blur' }
        // ],
        // sharePledgeMessage: [
        //   { max: 300, message: '长度在300个字符以内', trigger: 'blur' }
        // ],
        // outWarrant: [
        //   { max: 300, message: '长度在300个字符以内', trigger: 'blur' }
        // ],
        seProjectCompanyDueDiligenceShareholderInfoList: [
          {
            validator: checkSeProjectCompanyDueDiligenceShareholderInfoList
          }
        ]
        // projectInvestmentEvaluation: [
        //   { required: true, message: '《分布式光伏电站项目投资评估表》不能为空', trigger: 'change' }
        // ],
        // projectInvestmentCommittee: [
        //   { required: true, message: '《分布式光伏电站项目投委会决议》不能为空', trigger: 'change' }
        // ],
        // projectInvestmentProfit: [
        //   { required: true, message: '《投资收益评测算表》不能为空', trigger: 'change' }
        // ],
        // shareholdersImage: [
        //   { required: true, message: '大股东、实际控制人情况信息不能为空', trigger: 'change' }
        // ]
      }
    }
  },
  computed: {},
  created() {
    // TODO 是否需要获取已有数据
    this.getCurrentRecordInfomation()
  },
  methods: {
    getCurrentRecordInfomation() {
      const { projectId } = this.$route.query
      return getInformation({ projectId }).then((res) => {
        const { data } = res
        for (const key in data) {
          if (!Object.prototype.hasOwnProperty.call(data, key)) { continue }
          this.ruleForm[key] = data[key] ?? this.ruleForm[key]
        }
        this.ruleForm.projectId = projectId
        this.ruleForm.seProjectCompanyDueDiligenceShareholderInfoList = (this.ruleForm.seProjectCompanyDueDiligenceShareholderInfoList || []).map(v => {
          return { ...v, registerMoney: v.registerMoney || undefined }
        })
        console.log('====> 获取尽调信息: ', res)
      }, (err) => {
        console.log('尽调失败信息: ', err)
      })
    },
    refresh(cb) {
      if (this.ruleForm.dueDiligenceId) {
        typeof cb === 'function' && cb()
        return
      }
      this.getCurrentRecordInfomation().finally(() => {
        typeof cb === 'function' && cb()
      })
    },
    validateForm(callback = () => {}) {
      Promise.all([this.validWrapForm(), this.validRelationForm()]).then(() => {
        callback(true, this.ruleForm)
      }, (err) => {
        callback(false, err)
      })
    },
    validWrapForm() {
      return new Promise((res, rej) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            res(valid)
          } else {
            rej()
          }
        })
      })
    },
    validRelationForm() {
      return new Promise((res, rej) => {
        // 关联方 表单检查
        this.$refs.relationInfo.$refs.curForm.validate((valid) => {
          if (valid) {
            res(valid)
          } else {
            rej()
          }
        })
      })
    },
    submitForm(param, cb) {
      return setInformation(param).then((res) => {
        if (res && res.code === 0) {
          Message({
            message: '提交尽调信息成功',
            type: 'success'
          })
          return
        }
      }).finally(() => {
        typeof cb === 'function' && cb()
      })
    },
    validField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-card {
    margin: 20px;
  }
}
</style>
