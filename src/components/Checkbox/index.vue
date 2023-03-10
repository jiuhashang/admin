<template>
  <div>
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ label }}</el-checkbox>
    <el-checkbox-group v-model="cValue" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="(item) in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import Emitter from 'element-ui/src/mixins/emitter'
import isEqual from 'lodash/isEqual'

export default {
  mixins: [Emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: '全选'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkAll: false,
      cValue: [],
      stringValue: '',
      isIndeterminate: false
    }
  },
  watch: {
    value(newVal) {
      if (!isEqual(newVal, this.cValue)) {
        this.deal()
      }
    }
  },
  created() {
    this.deal()
  },
  methods: {
    handleCheckAllChange(val) {
      this.cValue = val ? this.options.map(({ value }) => value) : []
      this.isIndeterminate = false
      this.stringValue = this.cValue.join(',')
      this.$emit('change', this.stringValue)
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
      this.cValue = value
      this.stringValue = this.cValue.join(',')
      this.$emit('change', this.stringValue)
    },
    deal() {
      const valueArr = this.value.split(',').filter((v) => v)
      const len = valueArr.length
      if (len > 0 && len < this.options.length) {
        this.isIndeterminate = true
      } else {
        this.isIndeterminate = false
      }
      this.cValue = valueArr
      this.stringValue = this.cValue.join(',')
    }
  }
}
</script>
