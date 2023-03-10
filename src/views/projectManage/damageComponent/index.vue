<template>
  <div>
    <ListTitle />
    <el-card>
      <el-input v-model="selectInfo.queryParams" placeholder="组件SN码、项目单位、施工单位搜索" style="width:300px;margin-right:10px;" clearable @blur="selectBlur" />
      <el-button type="primary" @click="setProjectBuildDamageElement">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%">
        <el-table-column prop="code" label="已损坏组件SN码" />
        <el-table-column prop="companyName" label="项目单位" />
        <el-table-column prop="buildCompanyName" label="施工单位" />
        <el-table-column prop="setAddress" label="建站省市区" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row.elementImage)">查看组件图片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>

    <el-dialog :visible.sync="dialogVisible" @close="handleClose">
      <div style="text-align:center;">
        <img :src="imgSrc" alt="" style="width:400px;">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ListTitle from '@/components/ListTitle'
import { setProjectBuildDamageElement } from '@/api/damageComponent'
export default {
  components: {
    ListTitle
  },
  data() {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
        code: '',
        companyName: '',
        buildCompanyName: ''
      },
      selectInfo: {
        queryParams: ''
      },
      tableData: [],
      total: 0,

      // 对话框
      dialogVisible: false,
      imgSrc: ''
    }
  },
  created() {
    this.setProjectBuildDamageElement()
  },
  activated() {
    this.setProjectBuildDamageElement()
  },
  methods: {
    setProjectBuildDamageElement() {
      setProjectBuildDamageElement(this.queryInfo).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    reset() {
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10,
        code: '',
        companyName: '',
        buildCompanyName: ''
      }
      this.selectInfo = {
        queryParams: ''
      }
      this.setProjectBuildDamageElement()
    },
    selectBlur() {
      this.queryInfo.code = this.selectInfo.queryParams
      this.queryInfo.companyName = this.selectInfo.queryParams
      this.queryInfo.buildCompanyName = this.selectInfo.queryParams
    },
    handleView(elementImage) {
      this.dialogVisible = true
      this.imgSrc = elementImage
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pageSize = val
      this.setProjectBuildDamageElement()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pageIndex = val
      this.setProjectBuildDamageElement()
    },
    handleClose() {
      this.dialogVisible = false
      this.imgSrc = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-table {
  margin: 20px 0;
}
.el-pagination {
  margin: 20px;
  float: right;
}
</style>
