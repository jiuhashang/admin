<template>
  <div>
    <el-card>
      <el-input v-model="tableInfo.query" placeholder="输入项目id搜索" style="width:300px;margin-right:10px;" />
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-alert title="下载的项目文件，会通过服务器预下载进行管理，方便使用者快速下载，减少因网络问题导致的失败。预下载的文件最多保存7天，超时后将会被清除。" type="success" :closable="false" />
      <el-table v-loading="loading" :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="readyTime" label="完成预下载时间" width="180" />
        <el-table-column prop="progress" label="进度" width="100">
          <template slot-scope="scope">
            <span class="done-status">{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" label="文件大小" width="120">
          <template slot-scope="scope">
            <span class="done-status">{{ scope.row.fileSize | fileSizeFilter(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="spareTimeStr" label="剩余存储时间" width="120" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.candownload" type="text" @click="handleLoad(scope.row)">下载</el-button>
            <el-button class="red" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :page-index="queryInfo.pageIndex" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { selectDownFileList, deleteDownFileList } from '@/api/systemSetting/projectManager'

export default {
  filters: {
    statusFilter(status) {
      switch (status) {
        case 0:
          return '正在预下载'
        case 1:
          return '已完成'
        default:
          return '未知状态'
      }
    },
    fileSizeFilter(size = 0, status) {
      if (status !== 1) {
        return '-'
      }
      if (size === 0) {
        return '<1MB'
      }
      if (!size) {
        return '-'
      }
      if (size > 1024) {
        return (size / 1024).toFixed(2) + 'GB'
      }

      return size + 'MB'
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      tableInfo: {
        query: ''
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      uuid: 0,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: ''
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 表dan查询
    handleQuery() {
      this.queryInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    getList() {
      this.loading = true
      const uuid = ++this.uuid
      selectDownFileList({ ...this.queryInfo, fileName: this.tableInfo.query }).then(res => {
        if (uuid !== this.uuid) {
          return
        }
        const { records, total, current } = res.data
        this.tableData = records.map((item) => {
          return this.timeUtil(item)
        })
        this.total = total
        if (records && records.length === 0 && total && current > 1) {
          this.queryInfo.pageIndex = 1
          this.getList()
        }
      }).finally(() => {
        if (uuid === this.uuid) {
          this.loading = false
        }
      })
    },
    timeUtil(item) {
      const { status, fileValidityDate: dateStr, downUrl } = item
      let candownload = true // 是否能下载
      let spareTimeStr = '' // 剩余下载时间
      if (status !== 1 || !dateStr || !downUrl) {
        candownload = false
      }
      if (!dateStr) {
        spareTimeStr = '-'
      } else {
        const spareH = (new Date(dateStr).valueOf() - (new Date().valueOf())) / (60 * 60 * 1000)
        if (spareH <= 0) {
          candownload = false
          spareTimeStr = '已失效'
        } else if (spareH < 1) {
          spareTimeStr = '不足一小时'
        } else if (spareH < 12) {
          spareTimeStr = '不足十二小时'
        } else if (spareH < 24) {
          spareTimeStr = '不足一天'
        } else if (spareH < 48) {
          spareTimeStr = '一天'
        } else if (spareH < 72) {
          spareTimeStr = '两天'
        } else if (spareH < 96) {
          spareTimeStr = '三天'
        } else if (spareH < 120) {
          spareTimeStr = '四天'
        } else if (spareH < 144) {
          spareTimeStr = '五天'
        } else if (spareH < 168) {
          spareTimeStr = '六天'
        } else if (spareH < 192) {
          spareTimeStr = '七天'
        } else {
          spareTimeStr = '一周以上'
        }
      }
      item.candownload = candownload
      item.spareTimeStr = spareTimeStr
      return item
    },
    handleLoad(row) {
      window.open(row.downUrl)
    },
    handleDelete(row) {
      deleteDownFileList([row.id]).then(() => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-alert {
  margin: 20px 0;
}
.el-pagination {
  margin: 20px;
  float: right;
}
.red {
  color: #A30014;
}
</style>
