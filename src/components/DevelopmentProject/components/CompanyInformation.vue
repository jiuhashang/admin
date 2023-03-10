<template>
  <el-card>
    <h3>项目公司资料</h3>
    <el-form ref="ruleForm" :rules="companyInfoRules" :disabled="disabled" :model="companyInfo" label-width="100px" class="demo-ruleForm" label-position="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="公司名称" prop="companyName" class="must-form-item">
            <el-input v-model="companyInfo.companyName" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业类型" prop="companyType" class="must-form-item">
            <el-select v-model="companyInfo.companyType" style="width:100%;">
              <el-option label="机关事业" :value="0" />
              <el-option label="国有股份" :value="1" />
              <el-option label="外资" :value="2" />
              <el-option label="合资" :value="3" />
              <el-option label="民营" :value="4" />
              <el-option label="私营" :value="5" />
              <el-option label="个体" :value="6" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="法定代表人" prop="legalPerson" class="must-form-item">
            <el-input v-model="companyInfo.legalPerson" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册资本（万元）" prop="registerMoney" class="must-form-item">
            <c-input-number v-model="companyInfo.registerMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="实缴资本（万元）" prop="paidInMoney" class="must-form-item">
            <c-input-number v-model="companyInfo.paidInMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成立日期" prop="setDate" class="must-form-item">
            <el-date-picker
              v-model="companyInfo.setDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="核准日期" prop="approvalDate" class="must-form-item">
            <el-date-picker
              v-model="companyInfo.approvalDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="住所" prop="setAddress" class="must-form-item">
            <el-cascader v-model="companyInfo.setAddress" :options="options" style="width:100%;" :props="{ value: 'label', label: 'label', children: 'children' }" @change="handleChange" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="统一社会信用代码" prop="sameCreditCode" class="must-form-item">
            <el-input v-model="companyInfo.sameCreditCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="参保人数" prop="insuredPersonNum" class="must-form-item">
            <el-input v-model.number="companyInfo.insuredPersonNum" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话（用于登录企业端）" prop="companyPhone" class="must-form-item">
            <el-input v-model="companyInfo.companyPhone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="经营范围" prop="businessAround" class="must-form-item">
            <el-input v-model="companyInfo.businessAround" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="是否上市" prop="isNotMarket" class="must-form-item">
            <el-select v-model="companyInfo.isNotMarket" style="width:100%;">
              <el-option label="否" :value="0" />
              <el-option label="是" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上市类型" prop="listType" class="must-form-item">
            <el-select v-model="companyInfo.listType" style="width:100%;">
              <el-option label="主板" :value="0" />
              <el-option label="中小板" :value="1" />
              <el-option label="科创板" :value="2" />
              <el-option label="创业板" :value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上市时间" prop="listDate" class="must-form-item">
            <el-date-picker
              v-model="companyInfo.listDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市值（万元）" prop="marketValue" class="must-form-item">
            <!-- <el-input v-model.number="companyInfo.marketValue" /> -->
            <c-input-number v-model="companyInfo.marketValue" :multiple="0.0001" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="分层情况" prop="situation" class="must-form-item">
            <el-input v-model="companyInfo.situation" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="新三板" prop="newThirdBoard" class="must-form-item">
            <el-input v-model="companyInfo.newThirdBoard" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="其他说明">
            <el-input v-model="companyInfo.otherMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="companyInfoSave">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectCompanyInfo, getProvinceCity } from '@/api/developmentProject'
export default {
  inject: ['refreshing'],
  props: {
    seProjectCompanyInfo: {
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
    var checkInteger = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'))
      } else {
        const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,50}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('1-50字符，限中文、英文'))
        }
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // var checkTwo = (rule, value, callback) => {
    //   // if (!value) {
    //   //   return callback(new Error('内容不能为空'))
    //   // } else {
    //   const reg = /(^[0-9]{1,9}$)|(^[0-9]{1,9}[\.]{1}[0-9]{1,2}$)/
    //   // console.log(reg.test(value))
    //   if (reg.test(value)) {
    //     callback()
    //   } else {
    //     return callback(new Error('限数字，小数点后2位'))
    //   }
    //   // }
    // }
    var checkF = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^\d+(?:\.\d{0})?$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字或小数点后4位'))
      }
      // }
    }
    return {
      companyInfo: {},
      options: [],
      companyInfoRules: {
        companyName: [
          { message: '请输入公司名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        // companyType: [
        //   { message: '请选择企业类型', trigger: 'change' }
        // ],
        legalPerson: [
          { message: '请输入法定代表人', trigger: 'blur' },
          { validator: checkInteger, trigger: 'blur' }
        ],
        registerMoney: [
          // { message: '请输入注册资本', trigger: 'blur' },
          { validator: checkF, trigger: 'blur' }
        ],
        paidInMoney: [
          // { message: '请输入实缴资本', trigger: 'blur' },
          { validator: checkF, trigger: 'blur' }
        ],
        setDate: [
          { required: true, message: '请选择成立日期', trigger: 'blur,change' }
        ],
        approvalDate: [
          { required: true, message: '请选择核准日期', trigger: 'blur,change' }
        ],
        // setAddress: [
        //   { message: '请输入住所', trigger: 'blur' },
        //   { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        // ],
        // sameCreditCode: [
        //   { message: '请输入统一社会信用代码', trigger: 'blur' },
        //   { min: 18, max: 18, message: '18位，限数字、英文', trigger: 'blur' }
        // ],
        insuredPersonNum: [
          { type: 'number', message: '请输入参保人数', trigger: 'blur' }
        ],
        companyPhone: [
          { message: '请输入联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        businessAround: [
          { message: '请输入经营范围', trigger: 'blur' },
          { min: 1, max: 3000, message: '长度在 1 到 3000 个字符', trigger: 'blur' }
        ],
        // isNotMarket: [
        //   { message: '请选择是否上市', trigger: 'change' }
        // ],
        // listType: [
        //   { message: '请选择上市类型', trigger: 'change' }
        // ],
        listDate: [
          { type: 'date', message: '请选择上市时间', trigger: 'blur,change' }
        ],
        marketValue: [
          { type: 'number', message: '请输入市值', trigger: 'blur' }
        ],
        situation: [
          { message: '请输入分层情况', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        newThirdBoard: [
          { message: '请输入新三板', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
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
    seProjectCompanyInfo(oldVal, newVal) {
      this.companyInfo = oldVal
      if (oldVal.setAddress) {
        const i = oldVal.setAddress.split('-')
        this.companyInfo.setAddress = i
      }
    }
  },
  created() {
    this.getProvinceCity()
  },
  methods: {
    getProvinceCity() {
      getProvinceCity().then(res => {
        this.options = JSON.parse(res.data)
      })
    },
    companyInfoSave() {
      // console.log('111', this.companyInfo)
      // this.$refs.ruleForm.validate(valid => {
      // if (valid) {
      if (this.companyInfo.setAddress) {
        this.companyInfo.setAddress = this.companyInfo.setAddress.join('-')
      }
      if (this.submiting) { return }
      this.submiting = true
      this.companyInfo.projectId = this.$route.query.projectId
      setProjectCompanyInfo(this.companyInfo).then(res => {
        if (this.companyInfo.setAddress) {
          this.companyInfo.setAddress = this.companyInfo.setAddress.split('-')
        }
        this.$message.success(res.msg)
        if (!this.companyInfo.companyId) {
          this.$emit('saveRefresh', 'seProjectCompanyInfo')
        }
      }).finally(() => {
        this.submiting = false
      })
      // } else {
      //   return false
      // }
      // })
    },
    handleChange(value) {
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
