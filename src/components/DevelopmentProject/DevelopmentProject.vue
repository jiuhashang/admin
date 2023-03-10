<template>
  <div>
    <company-information :se-project-company-info="seProjectCompanyInfo" :disabled="disabled" :is-show="isShow" @saveRefresh="refreshData" />
    <produce-evidence :se-project-company-build-info="seProjectCompanyBuildInfo" :disabled="disabled" :is-show="isShow" @saveRefresh="refreshData" />

    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <h3>股权结构</h3>
        <div style="position:relative;top:10px;">
          <el-button type="primary" size="small" :disabled="disabled" @click="addStock">增加股权结构</el-button>
        </div>
      </div>
      <el-table :data="seProjectCompanyStockList" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="股东名称" prop="shareholderName" />
        <el-table-column label="股东性质" prop="stockType" />
        <el-table-column label="法人股东成立年限" prop="setDate" />
        <el-table-column label="认缴注册资本(万元)" prop="subscriptionMoney">
          <template slot-scope="scope">
            <span>{{ scope.row.subscriptionMoney /10000 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实缴注册资本(万元)" prop="paidInMoney">
          <template slot-scope="scope">
            <span>{{ scope.row.paidInMoney /10000 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="股权比列（%）" prop="stockScale">
          <template slot-scope="scope">
            <span>{{ scope.row.stockScale * 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="disabled" icon="el-icon-edit" size="small" @click="editStock(scope.row)">修 改</el-button>
            <el-button type="danger" :disabled="disabled" icon="el-icon-delete" size="small" @click="deleteStock(scope.row.stockId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card>
      <div style="display:flex;justify-content:space-between;margin-top:10px;">
        <h3>组织结构</h3>
        <div style="position:relative;top:10px;">
          <el-button type="primary" size="small" :disabled="disabled" @click="addPerson">增加核心管理层</el-button>
        </div>
      </div>
      <el-table :data="seProjectCompanyOrganizationPersonList" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="姓名" prop="realName" />
        <el-table-column label="岗位" prop="stationName" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="籍贯(省市)" prop="nativePlace" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="disabled" icon="el-icon-edit" size="small" @click="editPerson(scope.row)">修 改</el-button>
            <el-button type="danger" :disabled="disabled" icon="el-icon-delete" size="small" @click="deletePerson(scope.row.personId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h5><span style="color: #F56C6C; margin-right: 4px;">*</span>公司组织架构（最多5张）</h5>
      <image-upload-string v-model="seProjectCompanyOrganization.organizationImage" :disabled="disabled" :limit="5" fit="fill" />
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button :disabled="disabled" plain>取 消</el-button> -->
        <el-button :disabled="disabled" :loading="btnLoading" type="primary" @click="personInfoSave">保 存</el-button>
      </div>
    </el-card>

    <production-situation :disabled="disabled" :se-project-company-business-info="seProjectCompanyBusinessInfo" :is-show="isShow" @saveRefresh="refreshData" />
    <financial :disabled="disabled" :se-project-company-finance-info="seProjectCompanyFinanceInfo" :is-show="isShow" @saveRefresh="refreshData" />
    <project-introduction :disabled="disabled" :se-project-company-project-message="seProjectCompanyProjectMessage" :is-show="isShow" @saveRefresh="refreshData" />
    <contract :disabled="disabled" :se-project-contract="seProjectContract" :is-show="isShow" @saveRefresh="refreshData" />

    <el-dialog title="增加股权结构" :visible.sync="stockDialogVisible" :close-on-click-modal="false" width="30%" @close="clearStock">
      <el-form ref="stockAddRuleForm" :rules="stockRules" :model="stockForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="股东名称" prop="shareholderName">
          <el-input v-model="stockForm.shareholderName" />
        </el-form-item>
        <el-form-item label="股东性质" prop="stockType">
          <el-select v-model="stockForm.stockType" placeholder="请选择股东性质" style="width:100%;">
            <el-option label="自然人" value="自然人" />
            <el-option label="法人" value="法人" />
          </el-select>
        </el-form-item>
        <el-form-item label="法人股东成立年限">
          <el-date-picker v-model="stockForm.setDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp" style="width:100%;" />
        </el-form-item>
        <el-form-item label="认缴注册资本（万元）" prop="subscriptionMoney" class="must-form-item">
          <c-input-number v-model="stockForm.subscriptionMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
        </el-form-item>
        <el-form-item label="实缴注册资本（万元）" prop="paidInMoney" class="must-form-item">
          <c-input-number v-model="stockForm.paidInMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
        </el-form-item>
        <el-form-item label="股东比列（%）" prop="stockScale" class="must-form-item">
          <c-input-number v-model="stockForm.stockScale" :multiple="100" controls-position="right" style="width:100%;" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stockDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stock">新 增</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改股权结构" :visible.sync="editStockDialogVisible" :close-on-click-modal="false" width="30%">
      <el-form ref="stockEditRuleForm" :rules="stockRules" :model="editDeepStockForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="股东名称" prop="shareholderName">
          <el-input v-model="editDeepStockForm.shareholderName" />
        </el-form-item>
        <el-form-item label="股东性质" prop="stockType">
          <el-select v-model="editDeepStockForm.stockType" placeholder="请选择股东性质" style="width:100%;">
            <el-option label="自然人" value="自然人" />
            <el-option label="法人" value="法人" />
          </el-select>
        </el-form-item>
        <el-form-item label="法人股东成立年限" prop="setDate">
          <el-date-picker
            v-model="editDeepStockForm.setDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
          />
        </el-form-item>
        <el-form-item label="认缴注册资本（万元）" prop="subscriptionMoney">
          <c-input-number v-model="editDeepStockForm.subscriptionMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
        </el-form-item>
        <el-form-item label="实缴注册资本（万元）" prop="paidInMoney">
          <c-input-number v-model="editDeepStockForm.paidInMoney" :multiple="0.0001" controls-position="right" style="width:100%;" />
        </el-form-item>
        <el-form-item label="股东比列（%）" prop="stockScale">
          <c-input-number v-model="editDeepStockForm.stockScale" :multiple="100" controls-position="right" style="width:100%;" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStockDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="增加核心管理层" :visible.sync="personDialogVisible" :close-on-click-modal="false" width="30%" @close="clearPerson">
      <el-form ref="personAddRuleForm" :rules="personRules" :model="personForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="personForm.realName" />
        </el-form-item>
        <el-form-item label="岗位" prop="stationName">
          <el-select v-model="personForm.stationName" placeholder="请选择岗位" style="width:100%;">
            <el-option label="董事长" value="董事长" />
            <el-option label="执行董事" value="执行董事" />
            <el-option label="总裁" value="总裁" />
            <el-option label="副总裁" value="副总裁" />
            <el-option label="总经理" value="总经理" />
            <el-option label="副总经理" value="副总经理" />
            <el-option label="执行董事兼总裁" value="执行董事兼总裁" />
            <el-option label="执行董事兼总经理" value="执行董事兼总经理" />
            <el-option label="监理" value="监理" />
            <el-option label="总监" value="总监" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="personForm.age" />
        </el-form-item>
        <el-form-item label="籍贯（省市）">
          <el-cascader v-model="personForm.nativePlace" size="small" style="width:100%;" :options="options" @change="handleChange1" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="personDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="person">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改核心管理层" :visible.sync="editPersonDialogVisible" :close-on-click-modal="false" width="30%">
      <el-form ref="personEditRuleForm" :rules="personRules" :model="editDeepPersonForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="editDeepPersonForm.realName" />
        </el-form-item>
        <el-form-item label="岗位" prop="stationName">
          <el-select v-model="editDeepPersonForm.stationName" placeholder="请选择岗位" style="width:100%;">
            <el-option label="董事长" value="董事长" />
            <el-option label="执行董事" value="执行董事" />
            <el-option label="总裁" value="总裁" />
            <el-option label="副总裁" value="副总裁" />
            <el-option label="总经理" value="总经理" />
            <el-option label="副总经理" value="副总经理" />
            <el-option label="执行董事兼总裁" value="执行董事兼总裁" />
            <el-option label="执行董事兼总经理" value="执行董事兼总经理" />
            <el-option label="监理" value="监理" />
            <el-option label="总监" value="总监" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="editDeepPersonForm.age" />
        </el-form-item>
        <el-form-item label="籍贯（省市）" prop="nativePlace">
          <el-cascader v-model="editDeepPersonForm.nativePlace" size="small" style="width:100%;" :options="options" @change="handleChange2" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPersonDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPerson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDetail } from '@/api/listProject'
import { setProjectCompanyStock, deleteOne, setProjectCompanyOrganization, setProjectCompanyOrganizationPerson, setProjectCompanyOrganizationPersonList } from '@/api/developmentProject'

import { CompanyInformation, ProduceEvidence, ProductionSituation, Financial, ProjectIntroduction, Contract } from './components/index'

import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import _ from 'lodash'
export default {
  name: 'DevelopmentProject',
  components: {
    CompanyInformation,
    ProduceEvidence,
    ProductionSituation,
    Financial,
    ProjectIntroduction,
    Contract
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  provide: function() {
    return {
      refreshing: this.refreshingObj
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
    // var checkTwo = (rule, value, callback) => {
    // if (!value) {
    //   return callback(new Error('内容不能为空'))
    // } else {
    //   const reg = /(^[0-9]{1,9}$)|(^[0-9]{1,9}[\.]{1}[0-9]{1,2}$)/
    //   // console.log(reg.test(value))
    //   if (reg.test(value)) {
    //     callback()
    //   } else {
    //     return callback(new Error('限数字，小数点后2位'))
    //   }
    // }
    // }
    return {
      // disabled: false,
      projectId: '',
      createTime: '',
      createUser: '',
      // 公司信息
      seProjectCompanyInfo: {},
      // 建筑物产证情况
      seProjectCompanyBuildInfo: {},
      // 股权结构
      seProjectCompanyStockList: [],
      stockDialogVisible: false,
      stockForm: {
        shareholderName: '',
        stockType: '',
        setDate: '',
        subscriptionMoney: '',
        paidInMoney: '',
        stockScale: ''
      },
      editStockDialogVisible: false,
      editStockForm: {
        shareholderName: '',
        stockType: '',
        setDate: '',
        subscriptionMoney: '',
        paidInMoney: '',
        stockScale: ''
      },
      stockRules: {
        shareholderName: [
          { required: true, message: '请输入股东名称', trigger: 'blur' },
          { validator: checkInteger, trigger: 'blur' }
        ],
        stockType: [{ required: true, message: '请选择股东性质', trigger: 'change' }],
        subscriptionMoney: [
          // { message: '请输入认缴注册资本', trigger: 'blur' }
          // { validator: checkTwo, trigger: 'blur' }
        ],
        paidInMoney: [
          // { message: '请输入实缴注册资本', trigger: 'blur' }
          // { validator: checkTwo, trigger: 'blur' }
        ],
        stockScale: [
          // { message: '请输入股东比列', trigger: 'blur' }
          // { validator: checkTwo, trigger: 'blur' }
        ]
      },
      editDeepStockForm: {},
      // 组织架构
      seProjectCompanyOrganizationPersonList: [],
      personDialogVisible: false, // 添加操作
      personForm: {
        realName: '',
        stationName: '',
        age: '',
        nativePlace: ''
      },
      editPersonDialogVisible: false,
      editPersonForm: {},
      editDeepPersonForm: {},
      personRules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkInteger, trigger: 'blur' }
        ],
        stationName: [{ required: true, message: '请选择岗位', trigger: 'change' }]
      },
      // 公司组织架构(图片)
      seProjectCompanyOrganization: {},
      // 生产情况
      seProjectCompanyBusinessInfo: {},
      // 财务情况
      seProjectCompanyFinanceInfo: {},
      // 项目简介
      seProjectCompanyProjectMessage: {},
      // 合同签约
      seProjectContract: {},
      // 省市联动
      options: provinceAndCityData,
      // 重新刷新
      refreshingObj: { value: false },
      submiting: false
    }
  },
  computed: {
    btnLoading() {
      console.log(this)
      return this.refreshingObj.value || this.submiting || false
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.createTime = this.$route.query.createTime
    this.createUser = this.$route.query.createUser
    this.getDetail(this.projectId) // 获取公司信息
  },
  methods: {
    refreshData(key) {
      console.log('refreshData', ...arguments)
      this.getDetail(this.projectId, key)
    },
    // 公司信息
    getDetail(projectId, key) {
      if (key) {
        this.refreshingObj.value = true
      }
      getDetail({ projectId }).then(res => {
        console.log(res)
        if (res.data.status === 0 || res.data.status === 2) {
          this.disabled = false
        } else {
          this.disabled = true
        }
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectCompanyStockList, seProjectCompanyOrganizationPersonList, seProjectCompanyOrganization, seProjectCompanyBusinessInfo, seProjectCompanyFinanceInfo, seProjectCompanyProjectMessage, seProjectContract } = res.data
        if (key) {
          this.$set(this, key, res.data[key] || {})
          return
        }
        if (seProjectCompanyInfo) { this.seProjectCompanyInfo = seProjectCompanyInfo }
        if (seProjectCompanyBuildInfo) { this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo }
        if (seProjectCompanyStockList) { this.seProjectCompanyStockList = seProjectCompanyStockList }
        if (seProjectCompanyOrganizationPersonList) { this.seProjectCompanyOrganizationPersonList = seProjectCompanyOrganizationPersonList }
        if (seProjectCompanyOrganization) { this.seProjectCompanyOrganization = seProjectCompanyOrganization }
        if (seProjectCompanyBusinessInfo) { this.seProjectCompanyBusinessInfo = seProjectCompanyBusinessInfo }
        if (seProjectCompanyFinanceInfo) { this.seProjectCompanyFinanceInfo = seProjectCompanyFinanceInfo }
        if (seProjectCompanyProjectMessage) { this.seProjectCompanyProjectMessage = seProjectCompanyProjectMessage }
        if (seProjectContract) { this.seProjectContract = seProjectContract }
      }).finally(() => {
        this.refreshingObj.value = false
      })
    },
    // 股权结构
    addStock() { // 添加对话框
      this.stockDialogVisible = true
    },
    stock() { // 添加
      this.stockForm.projectId = this.projectId
      this.$refs.stockAddRuleForm.validate(valid => {
        if (valid) {
          setProjectCompanyStock(this.stockForm).then(res => {
            this.$message.success(res.msg)
            this.stockDialogVisible = false
            this.getDetail(this.projectId)
          })
        }
      })
    },
    editStock(row) { // 修改当前行
      this.editDeepStockForm = _.cloneDeep(row)
      this.editStockDialogVisible = true
    },
    edit() { // 修改
      setProjectCompanyStock(this.editDeepStockForm).then(res => {
        this.$message.success(res.msg)
        this.getDetail(this.projectId)
        this.editStockDialogVisible = false
      })
    },
    clearStock() { // 关闭清空对话框
      this.$refs['stockAddRuleForm'].resetFields()
    },
    async deleteStock(stockId) { // 删除当前行
      const confirmResult = await this.$confirm('此操作会永久删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      deleteOne({ stockId }).then(res => {
        this.$message.success(res.msg)
        this.getDetail(this.projectId)
      })
    },
    // 组织架构
    addPerson() { // 新增对话框
      this.personForm.projectId = this.projectId
      this.personDialogVisible = true
    },
    person() { // 添加
      if (this.personForm.nativePlace) {
        const iw = `${CodeToText[this.personForm.nativePlace[0]]}-${CodeToText[this.personForm.nativePlace[1]]}`
        this.personForm.nativePlace = iw
      }
      this.$refs.personAddRuleForm.validate(valid => {
        if (valid) {
          setProjectCompanyOrganization(this.personForm).then(res => {
            this.$message.success(res.msg)
            this.personDialogVisible = false
            this.getDetail(this.projectId)
          })
        }
      })
    },
    editPerson(row) { // 修改当前行对话框
      this.editDeepPersonForm = _.cloneDeep(row)
      if (this.editDeepPersonForm.nativePlace) {
        const nativePlace = this.editDeepPersonForm.nativePlace.split('-')
        const setA = `${TextToCode[nativePlace[0]].code},${TextToCode[nativePlace[0]][nativePlace[1]].code}`
        const setAdd = setA.split(',')
        this.editDeepPersonForm.nativePlace = setAdd
      }
      this.editPersonDialogVisible = true
    },
    modifyPerson() { // 修改当前行
      if (this.editDeepPersonForm.nativePlace) {
        const iw = `${CodeToText[this.editDeepPersonForm.nativePlace[0]]}-${CodeToText[this.editDeepPersonForm.nativePlace[1]]}`
        this.editDeepPersonForm.nativePlace = iw
      }
      // console.log(this.editDeepPersonForm)
      this.$refs.personEditRuleForm.validate(valid => {
        if (valid) {
          setProjectCompanyOrganization(this.editDeepPersonForm).then(res => {
            this.$message.success(res.msg)
            this.editPersonDialogVisible = false
            this.getDetail(this.projectId)
          })
        }
      })
    },
    clearPerson() { // 关闭清空对话框
      this.$refs['personAddRuleForm'].resetFields()
    },
    async deletePerson(personId) { // 删除当前行
      const confirmResult = await this.$confirm('此操作会进行永久删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      setProjectCompanyOrganizationPerson({ personId }).then(res => {
        this.$message.success(res.msg)
        this.getDetail(this.projectId)
      })
    },
    personInfoSave() { // 增加修改组织架构人员
      if (this.submiting) { return }
      this.submiting = true
      this.seProjectCompanyOrganization.projectId = this.projectId
      setProjectCompanyOrganizationPersonList(this.seProjectCompanyOrganization).then(res => {
        this.$message.success(res.msg)
        this.getDetail(this.projectId)
        if (!this.seProjectCompanyOrganization.organizationPersonId) {
          this.refreshData('setProjectCompanyOrganizationPersonList')
        }
      }).finally(() => {
        this.submiting = false
      })
    },
    validField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName)
    },
    handleChange1(value) {
      console.log(value)
      // const iw = `${CodeToText[value[0]]}-${CodeToText[value[1]]}`
      // this.personForm.nativePlace = iw
    },
    handleChange2(value) {
      console.log(value)
      // const iw = `${CodeToText[value[0]]}-${CodeToText[value[1]]}`
      // this.editDeepPersonForm.nativePlace = iw
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
