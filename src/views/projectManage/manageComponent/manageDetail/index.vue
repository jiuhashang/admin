<template>
  <div>
    <detail-title>
      <div slot="btn">
        <!-- <el-button plain @click="handleCancel">取消</el-button> -->
        <div style="display: flex;">
          <el-button style="margin-right: 15px;" @click="download">下载excel模板</el-button>
          <file-upload
            ref="invertRef"
            :action="uploadUrl"
            :data="data"
            accept=".xls,.xlsx"
            :limit="Infinity"
            :show-file-list="false"
            @success="uploadSuccess"
          >
            <el-button type="primary">添 加</el-button>
          </file-upload>
        </div>
      </div>
    </detail-title>
    <basic-info />
    <!-- 组件列表 -->
    <el-card>
      <h3>组件</h3>
      <el-table :data="tableData1" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%">
        <el-table-column prop="code" label="组件SN码" />
        <el-table-column prop="checkStatus" label="添加方式">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus === 0">后台添加</span>
            <span v-else-if="scope.row.checkStatus === 1">后台添加</span>
            <span v-else>临时添加</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color:red;" @click="deleteElementCode(scope.row.codeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination1" :total="total1" @sendsize="handleSizeChange1" @sendpage="handleCurrentChange1" />
    </el-card>
    <!-- 逆变器列表 -->
    <el-card>
      <h3>逆变器</h3>
      <el-table :data="tableData2" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%">
        <el-table-column prop="code" label="组件SN码" />
        <el-table-column prop="checkStatus" label="添加方式">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus === 0">后台添加</span>
            <span v-else-if="scope.row.checkStatus === 1">后台添加</span>
            <span v-else>临时添加</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color:red;" @click="deleteInverterCode(scope.row.codeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination2" :total="total2" @sendsize="handleSizeChange2" @sendpage="handleCurrentChange2" />
    </el-card>
  </div>
</template>

<script>
import { setProjectBuildElementCode, setProjectBuildInverterCode, deleteProjectBuildInverterCode, deleteBuildInverterCode } from '@/api/manageComponent'
import FileUpload from '@/components/GlobalComponents/FileUpload/index.vue'

import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo'
// 添加组件excel地址
const inverterInfoUploadUrl = process.env.VUE_APP_BASE_API + '/admin/seProjectBuildElementCode/uploadElementExcel'
const excelurl = `https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/business%2F1632818224654.xls`

export default {
  components: {
    DetailTitle,
    BasicInfo,
    FileUpload
  },
  data() {
    return {
      projectId: '',
      createTime: '',
      createUser: '',
      uploadUrl: inverterInfoUploadUrl,
      data: {
        projectId: ''
      },
      zujianInfo: {
        projectId: '',
        pageIndex: 1,
        pageSize: 10
      },
      nibianInfo: {
        projectId: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData1: [],
      tableData2: [],
      total1: null,
      total2: null
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.createTime = this.$route.query.createTime
    this.createUser = this.$route.query.createUser
    this.data.projectId = this.projectId
    this.zujianInfo.projectId = this.projectId
    this.nibianInfo.projectId = this.projectId
    this.setProjectBuildElementCode()
    this.setProjectBuildInverterCode()
  },
  methods: {
    setProjectBuildElementCode() {
      setProjectBuildElementCode(this.zujianInfo).then(res => {
        console.log(res)
        this.tableData1 = res.data.records
        this.total1 = res.data.total
      })
    },
    setProjectBuildInverterCode() {
      setProjectBuildInverterCode(this.nibianInfo).then(res => {
        console.log(res)
        this.tableData2 = res.data.records
        this.total2 = res.data.total
      })
    },
    // 下载模板
    download() {
      window.open(excelurl)
    },
    // 添加组件/逆变器
    uploadSuccess(res, file, fileList) {
      console.log(res, file, fileList)
      if (file && file.code === 0) {
        this.$message.success(res.msg)
        this.setProjectBuildElementCode()
        this.setProjectBuildInverterCode()
        // if (file.data.length) {
        //   const { projectId } = this
        //   this.ruleForm.seProjectInverterInfoList = [
        //     ...this.ruleForm.seProjectInverterInfoList,
        //     ...file.data.map((
        //       {inverterAddress, isInverterCode, isCollectorCode}
        //     ) => {
        //       return { projectId, inverterAddress, isInverterCode, isCollectorCode }
        //     })
        //   ]
        // }
      }
      // this.$refs.invertRef.$refs.imageUpload.clearFiles()
    },
    // 删除组件
    async deleteElementCode(codeId) {
      const confirmResult = await this.$confirm(
        '确定要删除吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      deleteProjectBuildInverterCode({ codeId }).then(res => {
        this.$message.success(res.msg)
        this.setProjectBuildElementCode()
      })
    },
    // 删除逆变器
    async deleteInverterCode(codeId) {
      const confirmResult = await this.$confirm(
        '确定要删除吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      deleteBuildInverterCode({ codeId }).then(res => {
        this.$message.success(res.msg)
        this.setProjectBuildInverterCode()
      })
    },
    handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`)
      this.zujianInfo.pageSize = val
      this.setProjectBuildElementCode()
    },
    handleCurrentChange1(val) {
      // console.log(`当前页: ${val}`)
      this.zujianInfo.pageIndex = val
      this.setProjectBuildElementCode()
    },
    handleSizeChange2(val) {
      // console.log(`每页 ${val} 条`)
      this.nibianInfo.pageSize = val
      this.setProjectBuildInverterCode()
    },
    handleCurrentChange2(val) {
      // console.log(`当前页: ${val}`)
      this.nibianInfo.pageIndex = val
      this.setProjectBuildInverterCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
