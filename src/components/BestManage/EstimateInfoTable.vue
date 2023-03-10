<template>
  <el-card>
    <h3>发电预估</h3>
    <div>
      <el-table :data="realTableData" size="mini" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" border style="width: 100%">
        <el-table-column label="项目/运营年份" width="150">
          <template slot-scope="scope">
            {{ scope.row.yearNum || (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column prop="electricYear" label="年发电量（KWH）" />
        <el-table-column prop="electricPriceSelfUse" label="自发自用电价（元/度）" />
        <el-table-column prop="electricPriceBeLeft" label="余电上网电价（元/度）" />
        <el-table-column prop="electricYearSelfUse" label="年自发自用电量（KWH）" />
        <el-table-column prop="electricYearBeLeft" label="年余电上网电量（KWH）" />
        <el-table-column prop="electricSellIncome" label="售电收入（元）" />
      </el-table>
    </div>
  </el-card>

</template>
<script>
import { getSeProjectElectricEstimateInfoByProjectId } from '@/api/listProject/index'
export default {
  props: {
    useSelf: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: [String, Number],
      default: undefined
    },
    dataSource: {
      type: Array,
      default: () => (new Array(15)).fill({})
    }
  },
  data() {
    return {
      tableData: (new Array(15)).fill({})
    }
  },
  computed: {
    realTableData() {
      if (this.useSelf) {
        return this.tableData
      }
      return this.dataSource
    }
  },
  created() {
    if (this.useSelf) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      let { projectId } = this
      if (typeof projectId !== 'undefined') {
        projectId = +projectId
      } else {
        projectId = +this.$route.query.projectId
      }
      if (typeof projectId !== 'number' || isNaN(projectId)) {
        throw Error('need projectId here')
      }
      getSeProjectElectricEstimateInfoByProjectId({ projectId }).then(({ data }) => {
        this.tableData = data
      })
    }
  }
}
</script>
