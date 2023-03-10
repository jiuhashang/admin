<template>
  <div>
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
        <!-- <el-table-column prop="inverterCode" label="逆变器SN码" />
        <el-table-column prop="collectorCode" label="采集器SN码" /> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getGirdConnectionList } from '@/api/listProject'
export default {
  data() {
    return {
      seProjectParallelAgreementInfo: {},
      seProjectParallelLocaleInfo: {},
      seProjectParallelPhotovoltaicList: [],
      seProjectInverterInfoList: []
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.getGirdConnectionList(this.projectId)
  },
  methods: {
    // 并网信息
    getGirdConnectionList(projectId) {
      getGirdConnectionList({ projectId }).then(res => {
        const { seProjectParallelAgreementInfo, seProjectParallelLocaleInfo, seProjectParallelPhotovoltaicList, seProjectInverterInfoList } = res.data
        if (seProjectParallelAgreementInfo) { this.seProjectParallelAgreementInfo = seProjectParallelAgreementInfo }
        if (seProjectParallelLocaleInfo) { this.seProjectParallelLocaleInfo = seProjectParallelLocaleInfo }
        if (seProjectParallelPhotovoltaicList) { this.seProjectParallelPhotovoltaicList = seProjectParallelPhotovoltaicList }
        if (seProjectInverterInfoList) { this.seProjectInverterInfoList = seProjectInverterInfoList }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin:20px;
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
