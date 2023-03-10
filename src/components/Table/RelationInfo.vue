<template>
  <el-form ref="curForm" :model="value" :disabled="disabled">
    <el-table
      :data="value.seProjectCompanyDueDiligenceShareholderInfoList"
      border
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      class="relation-info-box relation-info-box-fas9"
    >
      <el-table-column prop="enterpriseName" label="企业名称">
        <template slot-scope="scope">
          <el-form-item
            :prop="'seProjectCompanyDueDiligenceShareholderInfoList.' + scope.$index + '.enterpriseName'"
          >
            <!-- :rules="{ required: true, message: '企业名称不能为空', trigger: 'blur' }" -->

            <el-input
              v-model="scope.row.enterpriseName"
              size="mini"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="legalPerson" label="法定代表人">
        <template slot-scope="scope">
          <el-form-item
            :prop="'seProjectCompanyDueDiligenceShareholderInfoList.' + scope.$index + '.legalPerson'"
          >
            <!-- :rules="{ required: true, message: '法定代表人信息不能为空', trigger: 'blur' }" -->
            <el-input
              v-model="scope.row.legalPerson"
              size="mini"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="registerMoney" label="注册资本(万元)">
        <template slot-scope="scope">
          <el-form-item
            :prop="'seProjectCompanyDueDiligenceShareholderInfoList.' + scope.$index + '.registerMoney'"
          >
            <!-- :rules="[{ type: 'number', required: true, message: '注册资本信息不能为空', trigger: 'blur'}, { type: 'number', min: 1, message: '注册资本不能小于1', trigger: 'blur' }]" -->

            <!-- <el-input-number
              v-model="scope.row.registerMoney"
              width="190"
              :min="1"
              :max="10000000000000"
              label="注册资本,单位万元"
              size="mini"
              controls-position="right"
              style="width: 100%"
            /> -->
            <c-input-number
              v-model="scope.row.registerMoney"
              :min="1"
              :max="10000000000000"
              :multiple="0.0001"
              size="mini"
              :precision="2"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地区">
        <template slot-scope="scope">
          <el-form-item
            :prop="'seProjectCompanyDueDiligenceShareholderInfoList.' + scope.$index + '.address'"
          >
            <!-- :rules="{ required: true, message: '地区信息不能为空', trigger: 'blur' }" -->

            <el-input
              v-model="scope.row.address"
              size="mini"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button type="primary" size="small" @click="addRow">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>

</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    addRow() {
      this.value.seProjectCompanyDueDiligenceShareholderInfoList.push({
        enterpriseName: '',
        legalPerson: '',
        registerMoney: undefined,
        address: '',
        key: `${new Date().valueOf()}_${Math.random()}`
      })
      this.$emit('change', this.value)
    },
    rowKey(row, index) {
      return `${row.projectId}_${row.shareholderId}_${row.dueDiligenceId}_${row.key}_${index}`
    },
    handleDelete(index) {
      const value = this.value.seProjectCompanyDueDiligenceShareholderInfoList.filter((v, i) => i !== index)
      this.value.seProjectCompanyDueDiligenceShareholderInfoList = value
      this.$emit('change', this.value)
    },
    tableRowClassName({ row, rowIndex }) {
      const keys = ['address', 'enterpriseName', 'legalPerson', 'registerMoney']
      console.log(rowIndex, keys.some(key => !row[key]))
      return keys.some(key => !row[key]) ? 'relation-error-tr' : ''
    }
  }
}
</script>
<style scoped>
  ::v-deep .relation-info-box-fas9  .el-form-item:not(.is-error) {
    margin-bottom: 0 !important;
  }

  ::v-deep .relation-info-box-fas9 tr th:nth-last-child(2) .cell:before {
    display: none;
  }
</style>
