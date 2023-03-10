<template>
  <div>
    <list-title />

    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.query" placeholder="输入角色名称查询" clearable style="width:300px;" />
          </el-form-item>
          <slot name="leftFormArea" :tableInfo="tableInfo" />
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="handleCreateRoleClickEvent">创建角色</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <slot name="tableRow">
          <el-table-column prop="roleName" label="角色名称" width="250" />
          <el-table-column prop="remark" label="描述" />
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
              <el-button class="red-btn" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </slot>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getAdminRoleList, deleteRole } from '@/api/systemSetting/projectManager'
import ListTitle from '@/components/ListTitle'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'RoleManagePage',
  components: { ListTitle },
  data() {
    return {
      tableInfo: {
        query: ''
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      total: null
    }
  },
  created() {
    this.$emit('init', this.tableInfo)
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      const { query, ...resetTableInfo } = this.tableInfo
      const param = { ...resetTableInfo, ...this.queryInfo, roleName: query }
      getAdminRoleList(param).then(res => {
        const { current, records, total } = res.data
        this.tableData = records
        this.currentPage = current
        this.total = total
        if (this.total && !records.length && (current > 1)) {
          this.handleCurrentChange(1)
        }
      })
    },
    // 表dan查询
    handleQuery() {
      this.queryInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: ''
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10
      }
      this.$emit('reset', this.tableInfo)
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 创建新角色
    handleCreateRoleClickEvent() {
      this.$router.push({
        name: 'createRole'
      })
    },
    // 查看详情
    handleEdit(row) {
      this.$router.push({
        name: 'createRole',
        query: {
          roleId: row.id
        }
      })
    },
    // 删除
    handleDelete(row) {
      MessageBox.confirm('删除该角色?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManager(row.id).then(() => {
          Message({
            type: 'success',
            message: '删除角色成功'
          })
          this.getList()
        })
      })
    },

    deleteManager(roleId) {
      return deleteRole({ id: roleId })
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
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
.el-pagination {
  margin: 20px;
  float: right;
}
.red-btn {
  color: #D9001B;
}
</style>
