<template>
  <div>
    <best-manage-component :disabled="true" />
  </div>
</template>

<script>
import BestManageComponent from '@/components/BestManage/BestManage.vue'
export default {
  components: {
    BestManageComponent
  },
  props: {
    informationObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: { name: '' },
      tableData: [],
      debt: ['流动比率（倍）', '速动比率（倍）', '资产负债率（%）', '净利润（元）', '息税折旧摊销前利润（元）', '利息费用（元）', '利息保障倍数（倍）', '经营活动现金流量净额（元）'], // 偿债
      operating: ['应收账款周转率（次/年）', '存货周转率（次/年）', '营业周期（天）'], // 运营
      profit: ['销售利润率', '总资产利润率', '净资产利润率'], // 盈利
      growth: ['总资产增长率', '营业收入增长率', '净利润增长率'] // 成长
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 20px;
}
</style>
