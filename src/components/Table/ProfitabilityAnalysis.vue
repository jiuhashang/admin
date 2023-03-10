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
      keys: ['sellProfixScale', 'totalPropertyScale', 'netPropertyScale'],
      labels: ['销售利润率(%)', '总资产利润率(%)', '净资产利润率(%)']
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
