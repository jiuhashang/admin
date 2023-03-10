<template>
  <solvency-analysis :value="value" :keys="keys" :labels="labels" @change="handleChange" />
</template>

<script>
import SolvencyAnalysis from './SolvencyAnalysis.vue'
export default {
  components: {
    SolvencyAnalysis
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      keys: ['totalPropertyGrowScale', 'businessIncomeGrowScale', 'profixGrowScale'],
      labels: ['总资产增长率(%)', '营业收入增长率(%)', '净利润增长率(%)']
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
