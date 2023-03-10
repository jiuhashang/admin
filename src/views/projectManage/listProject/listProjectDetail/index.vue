<template>
  <div>
    <detail-title />
    <!-- 基本信息 -->
    <basic-info />
    <!-- tabs标签 -->
    <c-tabs>
      <el-tab-pane label="项目开发" name="first" :lazy="true">
        <project-dev />
      </el-tab-pane>
      <el-tab-pane label="技术评估" name="second" :lazy="true">
        <technical-eva />
      </el-tab-pane>
      <el-tab-pane label="尽调信息" name="third" :lazy="true">
        <best-info />
      </el-tab-pane>
      <el-tab-pane label="发电预估" name="four" :lazy="true">
        <earnings-est />
      </el-tab-pane>
      <el-tab-pane label="施工准备" name="fif" :lazy="true">
        <construction-pre />
      </el-tab-pane>
      <el-tab-pane label="施工过程" name="six" :lazy="true">
        <construction-pro />
      </el-tab-pane>
      <el-tab-pane label="并网信息" name="seven" :lazy="true">
        <grid-info />
      </el-tab-pane>
    </c-tabs>
  </div>
</template>

<script>
// import { getDetail, getTechnical, getInformation } from '@/api/listProject'

import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo'

import { ProjectDev, BestInfo, EarningsEst, ConstructionPre, ConstructionPro, GridInfo } from './components'
import TechnicalEva from '@/components/TechnicalEva/TechnicalEva.vue'

export default {
  components: {
    DetailTitle,
    BasicInfo,
    ProjectDev,
    TechnicalEva,
    BestInfo,
    EarningsEst,
    ConstructionPre,
    ConstructionPro,
    GridInfo
  },
  data() {
    return {
      // 项目ID
      projectId: '',
      createTime: '',
      createUser: '',

      object: {},

      // 项目公司资料
      seProjectCompanyInfo: {},
      // 建筑物产证情况
      seProjectCompanyBuildInfo: {},
      // 股权结构
      seProjectCompanyStockList: [],
      // 组织架构
      seProjectCompanyOrganizationPersonList: [],
      // 公司组织架构
      seProjectCompanyOrganization: {},
      // 生产情况
      seProjectCompanyBusinessInfo: {},
      // 财务情况
      seProjectCompanyFinanceInfo: {},
      // 项目简介
      seProjectCompanyProjectMessage: {},
      // 合同签约
      seProjectContract: {},

      activeName: 'first',

      // 技术评估
      technicalObj: {},
      // 尽调信息
      informationObj: {}
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.createTime = this.$route.query.createTime
    this.createUser = this.$route.query.createUser
    // this.getDetail(this.projectId)
    // this.getTechnical(this.projectId)
    // this.getInformation(this.projectId)
  },
  methods: {
    // getDetail(projectId) {
    //   getDetail({ projectId }).then(res => {
    //     console.log(res.data)
    //     this.object = res.data
    //     const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectCompanyStockList, seProjectCompanyOrganizationPersonList, seProjectCompanyOrganization, seProjectCompanyBusinessInfo, seProjectCompanyFinanceInfo, seProjectCompanyProjectMessage, seProjectContract } = res.data
    //     this.seProjectCompanyInfo = seProjectCompanyInfo
    //     this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
    //     this.seProjectCompanyStockList = seProjectCompanyStockList
    //     this.seProjectCompanyOrganizationPersonList = seProjectCompanyOrganizationPersonList
    //     this.seProjectCompanyOrganization = seProjectCompanyOrganization
    //     this.seProjectCompanyBusinessInfo = seProjectCompanyBusinessInfo
    //     this.seProjectCompanyFinanceInfo = seProjectCompanyFinanceInfo
    //     this.seProjectCompanyProjectMessage = seProjectCompanyProjectMessage
    //     this.seProjectContract = seProjectContract
    //   })
    // },
    // 技术评估
    // getTechnical(projectId) {
    //   getTechnical({ projectId }).then(res => {
    //     this.technicalObj = res.data
    //   })
    // },
    // 尽调信息
    // getInformation(projectId) {
    //   getInformation({ projectId }).then(res => {
    //     this.informationObj = res.data
    //   })
    // },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
