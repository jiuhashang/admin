<template>
  <el-select v-model="cValue" placeholder="请选择" style="width: 100%" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getDesulphurizeElectricityPrice } from '@/api/listProject/index'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      options: ['北京', '天津', '冀北', '冀南', '山西', '山东', '蒙西', '蒙东', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '湖北', '湖南', '河南', '四川', '重庆', '江西', '陕西', '甘肃', '青海', '宁夏', '广东', '广西', '云南', '贵州', '海南', '西藏', '新疆', '香港', '澳门'].map((v) => {
        return { label: v, value: v }
      }),
      cValue: ''
    }
  },
  watch: {
    value(newVal) {
      if (newVal !== this.cValue) {
        this.cValue = newVal
        this.handleChange(newVal)
      }
    }
  },
  created() {
    if (this.value) {
      this.cValue = this.value
      this.handleChange(this.value)
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
      getDesulphurizeElectricityPrice({ province: value }).then(({ data }) => {
        this.$emit('changePrice', data)
      })
    }
  }
}
</script>
