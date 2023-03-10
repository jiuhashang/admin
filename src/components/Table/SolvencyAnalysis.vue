<template>
  <sample-table :data-source="dataSource">
    <el-table-column prop="label" :label="columns[0]" />
    <el-table-column prop="FirstYear" :label="columns[1]">
      <template slot-scope="scope">
        <el-form-item
          :prop="scope.row.FirstYear"
        >
          <!-- :rules="{ required: true, message: '信息不能为空', trigger: 'blur' }" -->
          <el-input-number
            v-if="scope.row.label.indexOf('%') === -1"
            v-model="value[scope.row.FirstYear]"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
          <c-input-number
            v-else
            v-model="value[scope.row.FirstYear]"
            :multiple="100"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="SecondYear" :label="columns[2]">
      <template slot-scope="scope">
        <el-form-item
          :prop="scope.row.SecondYear"
        >
          <!-- :rules="{ required: true, message: '信息不能为空', trigger: 'blur' }" -->
          <el-input-number
            v-if="scope.row.label.indexOf('%') === -1"
            v-model="value[scope.row.SecondYear]"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
          <c-input-number
            v-else
            v-model="value[scope.row.SecondYear]"
            :multiple="100"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="ThirdYear" :label="columns[3]">
      <template slot-scope="scope">
        <el-form-item
          :prop="scope.row.ThirdYear"
        >
          <!-- :rules="{ required: true, message: '信息不能为空', trigger: 'blur' }" -->
          <el-input-number
            v-if="scope.row.label.indexOf('%') === -1"
            v-model="value[scope.row.ThirdYear]"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
          <c-input-number
            v-else
            v-model="value[scope.row.ThirdYear]"
            :multiple="100"
            size="mini"
            :precision="2"
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
      </template>

    </el-table-column>
  </sample-table>
</template>
<script>
import SampleTable from './SampleTable.vue'

export default {
  components: {
    SampleTable
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    labels: {
      type: Array,
      default: () => [
        '流动比率（倍）', '速动比率（倍）', '资产负债率（%）', '净利润（元）', '息税折旧摊销前利润（元）', '利息费用（元）',
        '利息保障倍数（%）', '经营活动现金流量净额（元）'
      ]
    },
    years: {
      type: Array,
      default: () => ['FirstYear', 'SecondYear', 'ThirdYear']
    },
    columns: {
      type: Array,
      default: () => ['项目', '第一年', '第二年', '第三年']
    },
    keys: {
      type: Array,
      default: () => [
        'flowScale', 'quickActionScale', 'propertyLiabilitiesScale', 'profit', 'ebitda', 'interestCost', 'interestCover', 'businessActivityCashFiowPrice'
      ]
    }
  },
  data() {
    return {
      dataSource: []
    }
  },
  watch: {
    value: {
      handler() {
        this.init()
      },
      deep: true
    },
    keys() {
      this.init()
    },
    years() {
      this.init()
    },
    labels() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleChange(row, key) {
      this.value[key] = row[key]
      this.$emit('change', this.value)
    },
    init() {
      const { labels, keys, years } = this
      this.dataSource = labels.map((v, i) => {
        const item = { label: v }
        for (const year of years) {
          const yearKeyStr = `${keys[i]}${year}`
          item[year] = yearKeyStr
          item[yearKeyStr] = this.value[yearKeyStr] ?? ''
        }
        return item
      })
    }
  }
}
</script>
