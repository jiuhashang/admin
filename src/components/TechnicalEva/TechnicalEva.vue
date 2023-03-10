<template>
  <el-form ref="ruleForm" :rules="technicalRules" :model="technicalObj" label-width="100px" label-position="top" :disabled="disabled">
    <el-card>
      <h3>屋顶情况</h3>
      <el-card style="margin:20px 0px;">
        <h4>混泥土</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="屋面漏水" prop="houseWaterLeakage" class="must-form-item">
              <el-select v-model="technicalObj.houseWaterLeakage" placeholder="请选择屋面漏水" style="width:100%;">
                <el-option label="无漏水" value="无漏水" />
                <el-option label="局部漏水" value="局部漏水" />
                <el-option label="严重漏水" value="严重漏水" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建设年限">
              <el-input v-model="technicalObj.setYear" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="屋顶现有设施">
              <el-input v-model="technicalObj.topHouseEquipment" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建筑物周围遮挡物">
              <el-input v-model="technicalObj.mudAroundScreen" type="textarea" autosize />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin:20px 0px;">
        <h4>彩钢瓦</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="类型" prop="colorSteelType" class="must-form-item">
              <el-select v-model="technicalObj.colorSteelType" placeholder="请选择类型" style="width:100%;">
                <el-option label="T型" value="T型" />
                <el-option label="角驰型" value="角驰型" />
                <el-option label="直立锁边型" value="直立锁边型" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="厚度（米）" prop="thickness" class="must-form-item">
              <el-input v-model="technicalObj.thickness" style="width:100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="锈蚀情况">
              <el-input v-model="technicalObj.rustMessage" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建设年限">
              <el-input v-model="technicalObj.colorSetYear" type="textarea" autosize />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="加强条件">
              <el-input v-model="technicalObj.addCondition" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="屋顶现有设施">
              <el-input v-model="technicalObj.rustTopHouseEquipment" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建筑物周围遮挡物">
              <el-input v-model="technicalObj.buildAroundScreen" type="textarea" autosize />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin:20px 0px;">
        <h4>屋顶荷载情况</h4>
        <el-alert title="* 现场勘测厂区布局、厂房结构、厂区内装修情况（是否吊顶），复核计算屋顶荷载：" type="success" :closable="false" />
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="屋面檩条计算是否满足要求" prop="housePurlinCount" class="must-form-item">
              <el-input v-model="technicalObj.housePurlinCount" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="刚架：砼柱、钢梁计算是否满足要求" prop="steelFrameCount" class="must-form-item">
              <el-input v-model="technicalObj.steelFrameCount" type="textarea" autosize />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="如不能满足要求，解决方案如下" prop="solveMessage" class="must-form-item">
              <el-input v-model="technicalObj.solveMessage" type="textarea" autosize />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card>
      <h3>电气设备安装情况</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="配电柜安装情况" prop="electricCabinetContent" class="must-form-item">
            <el-input v-model="technicalObj.electricCabinetContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="一、二次舱安装情况" prop="warehouseInstallContent" class="must-form-item">
            <el-input v-model="technicalObj.warehouseInstallContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="箱变安装情况" prop="boxChangeContent" class="must-form-item">
            <el-input v-model="technicalObj.boxChangeContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配电室空间大小" prop="electricRoomSizeContent" class="must-form-item">
            <el-input v-model="technicalObj.electricRoomSizeContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="电缆敷设情况" prop="cableLayContent" class="must-form-item">
            <el-input v-model="technicalObj.cableLayContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电缆沟走向情况" prop="cableTrendContent" class="must-form-item">
            <el-input v-model="technicalObj.cableTrendContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <h3>光伏系统接入情况</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="光伏组件排布" prop="pvElementRow" class="must-form-item">
            <el-input v-model="technicalObj.pvElementRow" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="并网点位置" prop="girdConnectionContent" class="must-form-item">
            <el-input v-model="technicalObj.girdConnectionContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="电压等级" prop="voltageLevelContent" class="must-form-item">
            <el-input v-model="technicalObj.voltageLevelContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变压器容量" prop="voltageChangeSizeContent" class="must-form-item">
            <el-input v-model="technicalObj.voltageChangeSizeContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="断路器品牌与大小" prop="breakBrandSizeContent" class="must-form-item">
            <el-input v-model="technicalObj.breakBrandSizeContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="进出线开关品牌与大小" prop="inOutBandSizeContent" class="must-form-item">
            <el-input v-model="technicalObj.inOutBandSizeContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="无功率补偿容量" prop="noPowerAddContent" class="must-form-item">
            <el-input v-model="technicalObj.noPowerAddContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <h3>其他</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="厂房排污情况" prop="factoryPolluteMessage" class="must-form-item">
            <el-input v-model="technicalObj.factoryPolluteMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当地电网并网要求" prop="localGirdConnectionMessage" class="must-form-item">
            <el-input v-model="technicalObj.localGirdConnectionMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="其他补充" prop="otherSupplement" class="must-form-item">
            <el-input v-model="technicalObj.otherSupplement" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术功能风险综合评估" prop="skillBuildEstimate" class="must-form-item">
            <el-input v-model="technicalObj.skillBuildEstimate" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script>
import { getOneByProjectId, getUpdateInfo } from '@/api/technicalEvaluation'
import { getUpdate } from '@/api/technicalEvaluation'
import { Message } from 'element-ui'

export default {
  data() {
    var checkTwo = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /(^[0-9]{1,9}$)|(^[0-9]{1,9}[\.]{1}[0-9]{1,2}$)/
      if (reg.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('限数字，小数点后2位'))
      }
      // }
    }
    return {
      disabled: false,
      technicalObj: {
        houseWaterLeakage: '',
        setYear: '',
        colorSetYear: '',
        topHouseEquipment: '',
        mudAroundScreen: '',
        colorSteelType: '',
        thickness: '',
        rustMessage: '',
        addCondition: '',
        rustTopHouseEquipment: '',
        buildAroundScreen: '',
        housePurlinCount: '',
        steelFrameCount: '',
        solveMessage: '',
        electricCabinetContent: '',
        warehouseInstallContent: '',
        boxChangeContent: '',
        electricRoomSizeContent: '',
        cableLayContent: '',
        cableTrendContent: '',
        pvElementRow: '',
        girdConnectionContent: '',
        voltageLevelContent: '',
        voltageChangeSizeContent: '',
        breakBrandSizeContent: '',
        inOutBandSizeContent: '',
        noPowerAddContent: '',
        factoryPolluteMessage: '',
        localGirdConnectionMessage: '',
        otherSupplement: '',
        skillBuildEstimate: ''
      },
      technicalRules: {
        houseWaterLeakage: [{ message: '请选择屋面漏水', trigger: 'change' }],
        colorSteelType: [{ message: '请选择类型', trigger: 'change' }],
        thickness: [
          // { type: 'number', message: '请输入厚度（米）', trigger: 'blur' },
          { validator: checkTwo, trigger: 'blur' }
        ],
        housePurlinCount: [
          { message: '请输入屋面檩条计算是否满足要求', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        steelFrameCount: [
          { message: '请输入刚架：砼柱、钢梁计算是否满足要求', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        solveMessage: [
          { message: '请输入如不能满足要求，解决方案如下', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        electricCabinetContent: [
          { message: '请输入配电柜安装情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        warehouseInstallContent: [
          { message: '请输入一、二次舱安装情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        boxChangeContent: [
          { message: '请输入箱变安装情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        electricRoomSizeContent: [
          { message: '请输入配电室空间大小', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        cableLayContent: [
          { message: '请输入电缆敷设情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        cableTrendContent: [
          { message: '请输入电缆沟走向情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        pvElementRow: [
          { message: '请输入光伏组件排布', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        girdConnectionContent: [
          { message: '请输入并网点位置', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        voltageLevelContent: [
          { message: '请输入电压等级', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        voltageChangeSizeContent: [
          { message: '请输入变压器容量', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        breakBrandSizeContent: [
          { message: '请输入断路器品牌与大小', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        inOutBandSizeContent: [
          { message: '请输入进出线开关品牌与大小', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        noPowerAddContent: [
          { message: '请输入无功率补偿容量', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        factoryPolluteMessage: [
          { message: '请输入厂房排污情况', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        localGirdConnectionMessage: [
          { message: '请输入当地电网并网要求', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        otherSupplement: [
          { message: '请输入其他补充', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        skillBuildEstimate: [
          { message: '请输入技术功能风险综合评估', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCurrentRecordInfomation()
    this.getUpdateInfo()
  },
  methods: {
    getUpdateInfo() { // 获取项目进程
      const { projectId } = this.$route.query
      getUpdateInfo({ projectId }).then(res => {
        const { status } = res.data
        if (status === 0 || status === 2) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      })
    },
    getCurrentRecordInfomation() { // 获取项目详情
      const { projectId } = this.$route.query
      return getOneByProjectId({ projectId }).then((res) => {
        const { data } = res
        for (const key in data) {
          if (!Object.prototype.hasOwnProperty.call(data, key)) { continue }
          this.technicalObj[key] = data[key] ?? this.technicalObj[key]
        }
        this.technicalObj.projectId = projectId
        console.log('====> 获取技术评估: ', res)
      }, (err) => {
        console.log('技术评估信息获取失败: ', err)
      })
    },
    refresh(cb) {
      if (this.technicalObj.assessId) {
        typeof cb === 'function' && cb()
        return
      }
      this.getCurrentRecordInfomation().finally(() => {
        typeof cb === 'function' && cb()
      })
    },
    validateForm(callback = () => {}) {
      console.log('===')
      this.validWrapForm().then(() => {
        callback(true, this.technicalObj)
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
    submitForm(param, cb) {
      return getUpdate(param).then((res) => {
        if (res && res.code === 0) {
          Message({
            message: '保存成功',
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
.el-card {
  margin: 20px;
}
.must-form-item {
  .el-form-item__label:before, thead th > .cell:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
}
</style>
