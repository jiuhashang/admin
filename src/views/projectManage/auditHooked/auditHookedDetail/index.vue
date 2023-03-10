<template>
  <div>
    <detail-title>
      <template v-if="gridConnectionStatus == 0 || gridConnectionStatus == 3" slot="btn">
        <el-button type="danger" @click="reject">审核驳回</el-button>
        <el-button type="primary" @click="through">审核通过</el-button>
      </template>
    </detail-title>
    <div style="margin:20px;">
      <el-alert title="并网初审后，将提交给银行进行审核。待银行审核完成后，项目便正式完成" type="success" :closable="false" />
    </div>
    <basic-info />
    <!-- 协议采集信息 -->
    <el-card>
      <h3>协议采集信息</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>购收电子合同照片</p>
          <image-upload-string :file-list="seProjectParallelAgreementInfo.buyElectricityContractFile" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>并网协议照片</p>
          <image-upload-string :file-list="seProjectParallelAgreementInfo.parallelAgreementFile" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
    </el-card>
    <!-- 现场信息采集 -->
    <el-card>
      <h3>现场信息采集</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>现场信息照片</p>
          <image-upload-string :file-list="seProjectParallelLocaleInfo.localeInfoFile" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
        <el-col :span="12">
          <p>逆变器正常运行照片</p>
          <image-upload-string :file-list="seProjectParallelLocaleInfo.inverterNormalFile" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>光伏并网表走字照片</p>
          <image-upload-string :file-list="seProjectParallelLocaleInfo.photovoltaicMeterFile" :disabled="true" :limit="Infinity">
            <template><div /></template>
          </image-upload-string>
        </el-col>
      </el-row>
      <el-table :data="seProjectParallelPhotovoltaicList" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%;margin-top:15px;">
        <el-table-column prop="photovoltaicNum" label="光伏表编号" />
      </el-table>
    </el-card>
    <!-- 逆变器与采集器扫码 -->
    <el-card>
      <h3>逆变器与采集器扫码</h3>
      <el-table :data="seProjectInverterInfoList" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%">
        <el-table-column prop="inverterAddress" label="逆变器位置" />
        <el-table-column label="逆变器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isInverterCode == 0">有</span>
            <span v-if="scope.row.isInverterCode == 1">无</span>
          </template>
        </el-table-column>
        <el-table-column label="逆变器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isInverterCode == 1">无</span>
            <span v-if="scope.row.isInverterCode == 0 && scope.row.inverterCode == ''">未扫码</span>
            <span v-if="scope.row.isInverterCode == 0 && scope.row.inverterCode !== ''">{{ scope.row.inverterCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采集器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isCollectorCode == 0">有</span>
            <span v-if="scope.row.isCollectorCode == 1">无</span>
          </template>
        </el-table-column>
        <el-table-column label="采集器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isCollectorCode == 1">无</span>
            <span v-if="scope.row.isCollectorCode == 0 && scope.row.collectorCode == ''">未扫码</span>
            <span v-if="scope.row.isCollectorCode == 0 && scope.row.collectorCode !== ''">{{ scope.row.collectorCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="请填写驳回理由" :visible.sync="dialogVisible" :close-on-click-modal="false" width="30%" @close="clearDialog">
      <el-form ref="ruleForm" :model="auditInfo" :rules="rules" class="demo-ruleForm">
        <el-form-item prop="remark">
          <el-input v-model="auditInfo.remark" type="textarea" :rows="3" placeholder="限50字以内" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fail">驳 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo'

import { getGirdConnectionList, girdConnectionExamine } from '@/api/auditHooked'
export default {
  components: {
    DetailTitle,
    BasicInfo
  },
  data() {
    return {
      projectId: '',
      gridConnectionStatus: '',
      seProjectParallelAgreementInfo: '', // 协议信息
      seProjectParallelLocaleInfo: '', // 现场信息采集
      seProjectParallelPhotovoltaicList: [],
      seProjectInverterInfoList: [],
      dialogVisible: false,
      auditInfo: {
        remark: ''
      },
      rules: {
        remark: [
          { required: true, message: '请填写驳回理由', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.gridConnectionStatus = this.$route.query.gridConnectionStatus
    this.getGirdConnectionList()
  },
  methods: {
    getGirdConnectionList() {
      const projectId = this.$route.query.projectId
      getGirdConnectionList({ projectId }).then(res => {
        console.log('1111222', res)
        const { seProjectParallelAgreementInfo, seProjectParallelLocaleInfo, seProjectParallelPhotovoltaicList, seProjectInverterInfoList } = res.data
        if (seProjectParallelAgreementInfo) this.seProjectParallelAgreementInfo = seProjectParallelAgreementInfo
        if (seProjectParallelLocaleInfo) this.seProjectParallelLocaleInfo = seProjectParallelLocaleInfo
        this.seProjectParallelPhotovoltaicList = seProjectParallelPhotovoltaicList
        this.seProjectInverterInfoList = seProjectInverterInfoList
      })
    },
    // 驳回
    reject() {
      this.dialogVisible = true
      this.auditInfo.type = 1
      this.auditInfo.projectId = this.projectId
    },
    fail() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return this.$message.warning('请填写驳回理由')
        girdConnectionExamine(this.auditInfo).then(res => {
          console.log(res)
          this.$message.warning('并网已审核驳回')
          this.dialogVisible = false
          this.$router.back()
        })
      })
    },
    // 通过
    async through() {
      this.auditInfo.type = 0
      this.auditInfo.projectId = this.projectId
      const confirmResult = await this.$confirm(
        '并网初审将提交至银行端进行最终审核，是否通过审核？',
        '提示',
        {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消审核')
      }
      girdConnectionExamine(this.auditInfo).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message.success('并网已审核通过')
          this.$router.back()
        }
      })
    },
    clearDialog() {
      this.auditInfo = {
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
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
