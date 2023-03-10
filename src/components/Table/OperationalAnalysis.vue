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
      keys: ['receivableAccountTurnover', 'inventoryTurnover', 'businessCycle'],
      labels: ['应收账款周转率（次/年）', '存货周转率（次/年）', '营业周期（天）']
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
