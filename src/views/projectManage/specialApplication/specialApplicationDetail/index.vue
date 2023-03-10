<template>
  <div>
    <detail-title />
    <el-card>
      <h3>基本信息</h3>
      <el-descriptions class="margin-top" :column="3" :size="size" border>
        <el-descriptions-item>
          <template slot="label">
            项目ID
          </template>
          {{ projectId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            项目公司
          </template>
          {{ companyName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            施工单位
          </template>
          {{ buildUserName }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card>
      <h3>申请列表</h3>
      <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe style="width: 100%">
        <el-table-column prop="summarize" label="特殊申请概述" :show-overflow-tooltip="true" />
        <el-table-column prop="createTime" label="提交时间" />
        <el-table-column prop="projectManagerName" label="指派项目经理" />
        <el-table-column prop="projectManagerPhone" label="项目经理手机号码" />
        <el-table-column label="审核情况">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" style="coloe:#f59a23;">待审核</span>
            <span v-if="scope.row.status == 2" style="color:#95f204;">已同意</span>
            <span v-if="scope.row.status == 3" style="color:#d9001b;">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>

    <!-- 查看详情对话框 -->
    <el-dialog title="特殊申请详情" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="clearDialog">
      <div>
        <h3>{{ dialogInfo.summarize }}</h3>
        <p>{{ dialogInfo.detail }}</p>
        <image-upload-string :file-list="imageUrl" :disabled="true" :limit="Infinity">
          <template><div /></template>
        </image-upload-string>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
        <el-button type="danger" size="mini" @click="close">拒 绝</el-button>
        <el-button type="primary" size="mini" @click="open">同 意</el-button>
      </span>
    </el-dialog>
    <!-- 二维码 -->
    <el-dialog :visible.sync="qrDialogVisible" width="15%" :close-on-click-modal="false" @close="clearCodeDialog">
      <div class="ddd">
        <h3>请打开支付宝扫码认证</h3>
        <div id="qrcode" ref="qrcode" />
        <p>失效时间：{{ failTime }}</p>
        <el-button @click="clearCodeDialog">已完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'

import { getList, updateOne } from '@/api/specialApplication'

import QRCode from 'qrcodejs2'
export default {
  components: {
    DetailTitle
  },
  data() {
    return {
      projectId: '',
      companyName: '',
      buildCompanyName: '',
      size: 'small',
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      dialogVisible: false,
      dialogInfo: {},
      throughInfo: { // 审核通过
        id: '',
        type: 0
      },
      failInfo: { // 审核失败
        id: '',
        type: 1
      },
      total: 0,
      imageUrl: '',
      qrDialogVisible: false,
      failTime: undefined
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.companyName = this.$route.query.companyName
    this.buildUserName = this.$route.query.buildUserName
    this.getList()
  },
  methods: {
    getList() {
      getList({ projectId: this.projectId }, this.queryInfo).then(res => {
        console.log(res)
        this.tableData = res.data.records
      })
    },
    // 查看详情 更改对话框
    handleView(row) {
      console.log(row)
      this.imageUrl = row.imageUrl
      this.dialogVisible = true
      this.dialogInfo = row
      this.throughInfo.id = row.id
      this.failInfo.id = row.id
    },

    // 拒绝提示
    async close() {
      const confirmResult = await this.$confirm('是否拒绝该特殊申请?', '提示', {
        confirmButtonText: '拒绝',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      updateOne(this.failInfo).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.dialogVisible = false
        this.getList()
      }).catch(() => {
        this.dialogVisible = false
      })
    },
    // 同意提示
    async open() {
      const confirmResult = await this.$confirm('同意特殊申请需要通过电子确认，是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      updateOne(this.throughInfo).then(res => {
        // console.log(res)
        this.dialogVisible = false
        this.qrDialogVisible = true
        this.failTime = this.formatDateTime(new Date(res.data.expire))
        this.$nextTick(() => {
          this.qrcode(res.data.authUrl)
        })
        this.getList()
      }).catch(() => {
        this.dialogVisible = false
      })
    },
    formatDateTime(date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      var second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    clearDialog() {
      this.dialogInfo = {}
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageIndex = val
      this.getList()
    },
    qrcode(authUrl) {
      // const qrcode = new QRCode('qrcode', {
      new QRCode('qrcode', {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: authUrl
      })
    },
    clearCodeDialog() {
      this.qrDialogVisible = false
      document.getElementById('qrcode').innerHTML = ''
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-image {
  width: 100px;
  height: 100px;
  margin-right:10px;
}
.ddd {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}
.hidden-upload-btn {
  ::v-deep button.is-disabled {
    display: none;
  }
}
::v-deep {
  // .el-table {
  //   margin-bottom: 32px;
  // }
  .custom-upload-images {
    .el-upload-list.el-upload-list--picture-card.is-disabled + div {
      display: none !important;
    }
    .el-upload-list.el-upload-list--picture-card.is-disabled:empty + div {
      display: block !important;
      &:hover, &:focus {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
      }
      i.el-icon-plus:before {
        content: "暂无";
        font-size: 14px;
      }
    }
  }
}
</style>
