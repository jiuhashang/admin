<template>
  <el-card>
    <h3>基本数据</h3>
    <el-alert title="以下数据在项目开发中完善" type="success" :closable="false" label-position="top" />
    <el-form ref="baseForm" :model="ruleForm" :rules="baseFormRules">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="项目规模（KW）" prop="projectScale">
            <el-input :value="ruleForm.projectScale" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一般工业商业电价（元/度）" prop="electricityPrice">
            <el-input :value="ruleForm.electricityPrice" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业主年均用电折扣（%）" prop="electricityDiscount">
            <c-input-number :multiple="100" :value="ruleForm.electricityDiscount" disabled controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="自发自用比例（%）" prop="selfUseScale">
            <c-input-number :multiple="100" :value="ruleForm.selfUseScale" disabled controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="地理位置（省市）" prop="address">
            <el-input :value="ruleForm.address" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="水平光照值" prop="levelBeam">
            <el-input :value="ruleForm.levelBeam" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <br>
    <el-alert title="请根据实际情况调整相关数据，点击【预估】按钮进行发电数据预估" type="success" :closable="false" />
    <el-form ref="estimateForm" :model="seProjectElectricEstimateInputParameter" :rules="rules" :disabled="disabled">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="脱硫煤价格区域" prop="desulfurizedAddress">
            <desulfurized-address v-model="seProjectElectricEstimateInputParameter.desulfurizedAddress" controls-position="right" @changePrice="handleDesulfurizedAddressChange" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="脱硫煤价格（元/度）" prop="desulfurizedPrice">
            <el-input-number v-model="seProjectElectricEstimateInputParameter.desulfurizedPrice" :min="0" placeholder="请先选择脱硫煤价格区域，此处为自动计算" controls-position="right" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="脱硫煤价格涨幅（%）" prop="desulfurizedPriceIncrease">
            <c-input-number v-model="seProjectElectricEstimateInputParameter.desulfurizedPriceIncrease" :multiple="100" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中央补贴部分是否免增值税" prop="isTax">
            <el-select v-model="seProjectElectricEstimateInputParameter.isTax" placeholder="请选择" style="width: 100%">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="销售税（%）" prop="sellTax">
            <c-input-number v-model="seProjectElectricEstimateInputParameter.sellTax" :min="0" :max="100" :multiple="100" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="自发自用补贴（元/度）" prop="selfUseSubsidy">
            <el-input-number v-model="seProjectElectricEstimateInputParameter.selfUseSubsidy" :min="0" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="补贴年限（年）" prop="subsidyYear">
            <el-input-number v-model="seProjectElectricEstimateInputParameter.subsidyYear" :min="0" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="首年后衰减率（%）" prop="afterFirstYearDecayRate">
            <c-input-number v-model="seProjectElectricEstimateInputParameter.afterFirstYearDecayRate" :min="0" :max="100" :multiple="100" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="第三年起发电量年衰减率（%）" prop="afterThirdYearDecayRate">
            <c-input-number v-model="seProjectElectricEstimateInputParameter.afterThirdYearDecayRate" :min="0" :max="100" :multiple="100" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="系统效率（%）" prop="systemEfficiency">
            <c-input-number v-model="seProjectElectricEstimateInputParameter.systemEfficiency" :min="0" :max="100" :multiple="100" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-button type="primary" style="width: 100%; margin: 8px 0 32px" @click="estimateSubmit">发电量预估测算</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { getSeProjectElectricEstimateInfo, seProjectElectricEstimateInfoCount } from '@/api/listProject/index'
import DesulfurizedAddress from '@/components/Select/DesulfurizedAddress.vue'
import { Message } from 'element-ui'

export default {
  components: {
    DesulfurizedAddress
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false, // 测算中
      ruleForm: {
        // 已有数据
        projectScale: '', // 项目规模
        electricityPrice: undefined, // 电价
        electricityDiscount: undefined, // 用电折扣
        selfUseScale: undefined, // 自用比例
        address: '', // 地理位置
        levelBeam: undefined // 水平面光照
      },
      projectId: undefined,
      // 估算入参
      seProjectElectricEstimateInputParameter: {
        desulfurizedAddress: '', // 地址
        desulfurizedPrice: undefined, // 脱硫煤价格
        desulfurizedPriceIncrease: 0, // 脱硫煤价格涨幅
        isTax: 0, // 是否免增值税(0:否；1：是)
        sellTax: 0.13, // 销售税
        selfUseSubsidy: 0.37, // 自发自用补贴
        subsidyYear: 20, // 补贴年限
        afterFirstYearDecayRate: 0.025, // 首年后衰减率
        afterThirdYearDecayRate: 0.0045, // 第三年起发电量年衰减率
        systemEfficiency: 0.815, // 系统效率
        id: undefined // 入参唯一key
      },
      baseFormRules: {
        'projectScale': [
          { required: true, message: '请前往项目开发填写项目规模', trigger: 'blur' }
        ],
        'electricityPrice': [
          { required: true, message: '请前往项目开发填写电价信息', trigger: 'blur' }
        ],
        'electricityDiscount': [
          { required: true, message: '请前往项目开发填写用电折扣', trigger: 'blur' }
        ],
        'selfUseScale': [
          { required: true, message: '请前往项目开发填写自用比例', trigger: 'blur' }
        ],
        'address': [
          { required: true, message: '请前往项目开发填写地理位置', trigger: 'blur' }
        ],
        'levelBeam': [
          { required: true, message: '请前往项目开发填写水平面光照', trigger: 'blur' }
        ]
      },
      rules: {
        'desulfurizedAddress': [
          { required: true, message: '请选择脱硫煤价格区域' }
        ],
        'desulfurizedPrice': [
          { required: true, message: '请选择脱硫煤价格区域以正确获取价格信息' }
        ],
        'desulfurizedPriceIncrease': [
          { required: true, message: '请输入脱硫煤价格涨幅' }
        ],
        'isTax': [
          { required: true, message: '请选择中央补贴部分是否免增值税' }
        ],
        'sellTax': [
          { required: true, message: '请正确输入销售税' }
        ],
        'selfUseSubsidy': [
          { required: true, message: '请正确输入自发自用补贴' }
        ],
        'subsidyYear': [
          { required: true, message: '请正确输入补贴年限' }
        ],
        'afterFirstYearDecayRate': [
          { required: true, message: '请正确输入首年后衰减率' }
        ],
        'afterThirdYearDecayRate': [
          { required: true, message: '请正确输入首年后衰减率' }
        ],
        'systemEfficiency': [
          { required: true, message: '请正确输入系统效率' }
        ]
      }
    }
  },
  created() {
    this.getDetailInfo()
    this.projectId = this.getProjectId()
    console.log(this)
  },
  methods: {
    estimateSubmit() {
      Promise.all([this.$refs.baseForm.validate(), this.$refs.estimateForm.validate()]).then(res => {
        this.sendEstimateAjax()
      }).catch(() => {})
    },
    sendEstimateAjax() {
      seProjectElectricEstimateInfoCount({
        ...this.ruleForm,
        projectId: this.projectId,
        seProjectElectricEstimateInputParameter: this.seProjectElectricEstimateInputParameter
      }).then(res => {
        const list = res?.data?.seProjectElectricEstimateList
        this.seProjectElectricEstimateInputParameter.id = res?.data?.seProjectElectricEstimateInputParameter?.id
        if (Array.isArray(list) && list.length) {
          this.$emit('estimate', list)
          Message({
            type: 'success',
            message: '测算成功'
          })
        }
      })
    },
    getDetailInfo() {
      const projectId = this.getProjectId()
      getSeProjectElectricEstimateInfo({ projectId }).then(({ data }) => {
        const keysLevel1 = ['projectScale', 'electricityPrice', 'electricityDiscount', 'selfUseScale', 'address', 'levelBeam']
        for (const key of keysLevel1) {
          if (Object.prototype.hasOwnProperty.call(data || {}, key)) {
            this.$set(this.ruleForm, key, data[key])
          }
        }

        const keysLevel2 = ['id', 'desulfurizedAddress', 'desulfurizedPrice', 'desulfurizedPriceIncrease', 'isTax', 'sellTax', 'selfUseSubsidy', 'subsidyYear', 'afterFirstYearDecayRate', 'afterThirdYearDecayRate', 'systemEfficiency']
        const obj = data?.seProjectElectricEstimateInputParameter || {}
        for (const key of keysLevel2) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            this.$set(this.seProjectElectricEstimateInputParameter, key, obj[key] ?? this.seProjectElectricEstimateInputParameter[key])
          }
        }

        if (data?.seProjectElectricEstimateList?.length) {
          this.$emit('estimate', data.seProjectElectricEstimateList)
        }
      })
    },
    handleDesulfurizedAddressChange(desulfurizedPrice) {
      this.seProjectElectricEstimateInputParameter.desulfurizedPrice = desulfurizedPrice
    },
    getProjectId() {
      let { projectId } = this
      if (typeof projectId !== 'undefined') {
        projectId = +projectId
      } else {
        projectId = +this.$route.query.projectId
      }
      if (typeof projectId !== 'number' || isNaN(projectId)) {
        throw Error('need projectId here')
      }
      return projectId
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-input-number {
    width: 100%;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number.is-controls-right .el-input__inner {
    text-align: left;
    padding-right: 15px;
  }
}
</style>
