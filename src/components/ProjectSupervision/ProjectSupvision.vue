<template>
  <div>
    <!-- 基本信息 -->
    <basic-info :project-id="'' + projectId" :create-time="projectInfo && projectInfo.createTime" :create-user="projectInfo && projectInfo.createUser" />

    <!-- 组件安装 -->
    <el-card>
      <h3>组件安装</h3>
      <p>安装后整体照片</p>
      <image-upload-string :file-list="buildElementWholeImageStr" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>

    <!-- 组件SN码 -->
    <el-card>
      <h3>组件SN码</h3>
      <el-table :data="buildElementTable" style="width: 100%">
        <el-table-column prop="code" label="组件SN码" />
        <el-table-column prop="checkStatus" label="识别类型">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | elementSNCheckStatus }}
          </template>
        </el-table-column>
      </el-table>
      <p>组件货箱照片</p>
      <image-upload-string :file-list="buildElementBoxImageStr" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>

    <!-- 线缆安装 -->
    <el-card>
      <h3>线缆安装</h3>
      <p>隐蔽工程</p>
      <el-form>
        <el-form-item>
          <el-select :value="isHideProjectCable" disabled placeholder="请选择">
            <el-option :value="0" label="有" />
            <el-option :value="1" label="无" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="12">
          <p>直流电缆 - 组件下方照片</p>
          <image-upload-string :file-list="directUnderElementImageCable" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>直流电缆 - 电缆槽照片</p>
          <image-upload-string :file-list="directCableTrayImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>直流电缆 - 逆变器侧接线处照片</p>
          <image-upload-string :file-list="directInverterSideImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>交流电缆 -  逆变器侧接线处照片</p>
          <image-upload-string :file-list="exchangeInverterSideImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>交流电缆 -  电缆槽内照片</p>
          <image-upload-string :file-list="exchangeCableTrayImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>交流电缆 -  并网柜侧接线处照片</p>
          <image-upload-string :file-list="exchangeGirdConnectionImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>隐蔽工程</p>
          <image-upload-string :file-list="hideProjectImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
    </el-card>

    <!-- 逆变器&配电箱安装 -->
    <el-card>
      <h3>逆变器&配电箱安装</h3>

      <p>当前逆变器设计类型</p>
      <el-form>
        <el-form-item>
          <el-select :value="inverterType" disabled placeholder="请选择">
            <el-option :value="0" label="低压" />
            <el-option :value="1" label="高压" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="12">
          <p>箱变</p>
          <image-upload-string :file-list="boxChangeImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>10千伏开关站照片</p>
          <image-upload-string :file-list="switchStationImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>并网柜照片</p>
          <image-upload-string :file-list="girdConnectionImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
    </el-card>

    <!-- 逆变器SN码 -->
    <el-card>
      <h3>逆变器SN码</h3>
      <el-table :data="inverterSNTable" style="width: 100%">
        <el-table-column prop="code" label="组件SN码" />
        <el-table-column prop="checkStatus" label="识别类型">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | elementSNCheckStatus }}
          </template>
        </el-table-column>
      </el-table>
      <p>组件货箱照片</p>
      <image-upload-string :file-list="inverterBoxImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>

    <!-- 防雷接地 -->
    <el-card>
      <h3>防雷接地</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>设备接地照片</p>
          <image-upload-string :file-list="equipmentImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>系统接地照片</p>
          <image-upload-string :file-list="systemImage" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
    </el-card>

    <!-- 安全教育 -->
    <el-card>
      <h3>安全教育</h3>
      <p>安全措施</p>
      <image-upload-string :file-list="systemImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
      <p>安全教育</p>
      <image-upload-string :file-list="systemImage" :disabled="true" :limit="Infinity">
        <template><div /></template>
      </image-upload-string>
    </el-card>

    <!-- 相关文件 -->
    <el-card class="hidden-upload-btn">
      <h3>相关文件</h3>
      <el-form ref="ruleForm" label-width="100px" :disabled="disabled" class="demo-ruleForm" label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="rentContractFile">
              <file-upload-string :file-list="safeAgreementUrl" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
                安全协议
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="rentContractFile">
              <file-upload-string :file-list="buildPlanUrl" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
                施工方案
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="rentContractFile">
              <file-upload-string :file-list="startReportUrl" :limit="1" accept=".doc,.docx,.pdf" required @change="validField('rentContractFile')">
                开工报告
              </file-upload-string>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import BasicInfo from '@/components/BasicInfo/index.vue'
import { getProjectExamineDetailInfo } from '@/api/listProject/index'

export default {
  components: { BasicInfo },
  props: {
    useSelf: {
      type: Boolean,
      default: true
    },
    dataSource: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      size: 'small',
      tableData: [],
      ruleForm: {
        name: ''
      },
      disabled: true,
      projectInfo: undefined,
      projectId: undefined,
      buildElementWholeImageStr: '', // 组件安装后整体照片链接, 地址以,分割
      buildElementTable: [], // 组件SN码table list
      buildElementBoxImageStr: '', // 组件货箱照片, 地址以,分割
      // 线缆
      isHideProjectCable: undefined, // 是否有隐蔽工程（0：有；1：没有）
      directUnderElementImageCable: '', // 直流电缆，组件下方照片
      directCableTrayImage: '', // 直流电缆，电缆槽内照片
      directInverterSideImage: '', // 直流电缆，逆变器侧照片
      exchangeInverterSideImage: '', // 交流电，逆变器侧照片
      exchangeCableTrayImage: '', // 交流电电缆槽照片
      exchangeGirdConnectionImage: '', // 交流电缆并网柜侧接线处照片
      hideProjectImage: '', // 隐蔽工程图片
      // 逆变器&配电箱安装
      inverterType: undefined, // 逆变器类型0：低压；1：高压
      boxChangeImage: '', // 箱变照片
      switchStationImage: '', // 开关站照片
      girdConnectionImage: '', // 并网柜照片
      inverterSNTable: [], // 逆变器SN码table
      inverterBoxImage: '', // 箱体照片

      // 防雷接地
      equipmentImage: '', // 设备
      systemImage: '', // 系统

      // 安全教育
      buildReadySafeStepImage: '', // 措施
      buildReadySafeTeachImage: '', // 教育

      // 文件
      buildPlanUrl: '', // 施工方案
      safeAgreementUrl: '', // 安全协议
      startReportUrl: '' // 开工报告
    }
  },
  watch: {
    dataSource(newVal) {
      if (newVal && !this.useSelf) {
        this.setData(newVal)
      }
    }
  },
  created() {
    const { projectId } = this.$route.query
    this.projectId = +projectId
    if (this.useSelf) {
      this.getDetailInfo()
    }
  },
  methods: {
    // 验收驳回
    handleDenyClickEvent() {

    },
    // 验收通过
    handleCheckPass() {

    },
    // 打开施工过程审批 的弹窗
    openBuildPointCheckDialog() {

    },
    getDetailInfo() {
      getProjectExamineDetailInfo({ projectId: this.projectId }).then(res => {
        console.log('监管详情:', res.data)
        this.setData(res.data)
      })
    },
    setData(data) {
      const {
        seProjectBuildElement, seProjectBuildElementCodeList, seProjectBuildCable, inverterType, seProjectBuildInverter,
        seProjectBuildConnectionLand, seProjectBuildReadySafeStepList, seProjectBuildReadySafeTeachList, seProjectBuildReady,
        seProjectBuildInverterCodeList
      } = data
      this.buildElementWholeImageStr = seProjectBuildElement?.wholeImage ?? this.buildElementWholeImageStr // 组件整体图
      this.buildElementTable = (seProjectBuildElementCodeList || []).map(item => { // SN码table
        return { code: item.code, checkStatus: item.checkStatus }
      })
      this.buildElementBoxImageStr = seProjectBuildElement?.elementBoxImage ?? this.buildElementBoxImageStr

      // 线缆
      this.isHideProjectCable = seProjectBuildCable?.isHideProject ?? this.isHideProjectCable
      this.directUnderElementImageCable = seProjectBuildCable?.directUnderElementImage ?? this.directUnderElementImageCable // 直流电缆，组件下方照片
      this.directCableTrayImage = seProjectBuildCable?.directCableTrayImage ?? this.directCableTrayImage // 直流电缆，电缆槽内照片
      this.directInverterSideImage = seProjectBuildCable?.directInverterSideImage ?? this.directInverterSideImage // 直流电缆，逆变器侧照片
      this.exchangeInverterSideImage = seProjectBuildCable?.exchangeInverterSideImage ?? this.exchangeInverterSideImage // 交流电，逆变器侧照片
      this.exchangeCableTrayImage = seProjectBuildCable?.exchangeCableTrayImage ?? this.exchangeCableTrayImage // 交流电电缆槽照片
      this.exchangeGirdConnectionImage = seProjectBuildCable?.exchangeGirdConnectionImage ?? this.exchangeGirdConnectionImage // 交流电缆并网柜侧接线处照片
      this.hideProjectImage = seProjectBuildCable?.hideProjectImage ?? this.hideProjectImage // 隐蔽工程图片

      // 逆变器
      this.inverterType = inverterType ?? this.inverterType
      this.boxChangeImage = seProjectBuildInverter?.boxChangeImage ?? this.boxChangeImage
      this.switchStationImage = seProjectBuildInverter?.switchStationImage ?? this.switchStationImage
      this.inverterBoxImage = seProjectBuildInverter?.inverterBoxImage ?? this.inverterBoxImage
      this.girdConnectionImage = seProjectBuildInverter?.girdConnectionImage ?? this.girdConnectionImage
      this.inverterSNTable = seProjectBuildInverterCodeList ?? this.inverterSNTable

      // 防雷接地
      this.equipmentImage = seProjectBuildConnectionLand?.equipmentImage ?? this.equipmentImage
      this.systemImage = seProjectBuildConnectionLand?.systemImage ?? this.systemImage

      // 安全教育
      this.buildReadySafeStepImage = seProjectBuildReadySafeStepList?.map(({ imageUrl }) => imageUrl).join(',') ?? this.buildReadySafeStepImage
      this.buildReadySafeTeachImage = seProjectBuildReadySafeTeachList?.map(({ imageUrl }) => imageUrl).join(',') ?? this.buildReadySafeTeachImage

      // 文件
      this.buildPlanUrl = seProjectBuildReady?.buildPlanUrl ?? this.buildPlanUrl
      this.safeAgreementUrl = seProjectBuildReady?.safeAgreementUrl ?? this.safeAgreementUrl
      this.startReportUrl = seProjectBuildReady?.startReportUrl ?? this.startReportUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;

  ::v-deep p {
    margin-bottom: 6px;
    font-size: 14px;
    color: #666;
  }
}

.hidden-upload-btn {
  ::v-deep button.is-disabled {
    display: none;
  }
}

::v-deep {
  .el-table {
    margin-bottom: 32px;
  }

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
