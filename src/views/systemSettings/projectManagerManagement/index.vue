<template>
  <div>
    <list-title />
    <el-card class="box-card">
      <div slot="header" style="display:flex;justify-content:space-between;">
        <div>
          <el-form ref="searchForm" class="search-form" :model="searchForm" inline>
            <col>
            <el-form-item prop="query">
              <el-input v-model="searchForm.query" placeholder="姓名、手机号搜索" clearable style="width:300px;" />
            </el-form-item>
            <!-- <el-form-item prop="status" label="账号状态：" style="margin: 0 60px">
              <el-radio-group v-model="searchForm.status">
                <el-radio-button :label="undefined">全部</el-radio-button>
                <el-radio-button :label="0">启用</el-radio-button>
                <el-radio-button :label="1">停用</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="handleAdd">添加项目经理</el-button>
        </div>
      </div>
      <div class="text item">
        <el-table :data="tableData">
          <el-table-column prop="managerName" label="项目经理姓名" />
          <el-table-column prop="idCard" label="身份证号码" />
          <el-table-column prop="managerPhone" label="手机号码" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
              <el-button class="red-btn" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      </div>
    </el-card>
    <el-dialog :title="(!modifyManagerInfo ? '添加': '修改') + '项目经理'" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-alert title="请认真核对项目经理的真实姓名、身份证号码与正在使用的手机号码。该信息将用于特殊情况申请的电子认证实名识别" type="success" :closable="false" />
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="id">
          <el-input v-model="ruleForm.id" @blur="autoUppercase" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="createLoading" type="primary" @click="createManger">{{ !modifyManagerInfo ? '创建': '修改' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ListTitle from '@/components/ListTitle'
import { getProjectManagerList, addOrUpdateProjectManager, deleteProjectManager } from '@/api/systemSetting/projectManager'
import debounce from 'lodash/debounce'
import { Message, MessageBox } from 'element-ui'

export default {
  components: { ListTitle },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的姓名'))
        }
      }
    }
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号码不能为空'))
      } else {
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码'))
        }
      }
    }
    return {
      tableData: [],
      searchForm: {
        query: ''
      },
      searchFormPageInfo: {
        pageSize: 10,
        pageIndex: 1
      },
      modifyManagerInfo: null, // 当前修改的经理信息
      createLoading: false,
      total: 0,
      currentPage: 0,
      dialogVisible: false,
      ruleForm: {
        id: '',
        name: '',
        phone: ''
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }],
        id: [{ required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: checkId, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetch()
  },
  activated() {
    this.fetch()
  },
  methods: {
    handleAdd() {
      this.modifyManagerInfo = null
      this.dialogVisible = true
      this.ruleForm.name = ''
      this.ruleForm.id = ''
      this.ruleForm.phone = ''
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    autoUppercase() {
      const { id: idCard } = this.ruleForm
      if (idCard && idCard.indexOf('x')) {
        this.ruleForm.id = String.prototype.toUpperCase.call(idCard)
      }
    },
    handleEdit(managerInfo) {
      this.modifyManagerInfo = managerInfo
      console.log(this.$refs)
      this.dialogVisible = true
      this.ruleForm.name = managerInfo.managerName
      this.ruleForm.id = managerInfo.idCard
      this.ruleForm.phone = managerInfo.managerPhone
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    handleDelete({ managerId }) {
      MessageBox.confirm('删除该项目经理?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManager(managerId)
      })
    },
    handleQuery() {
      this.searchFormPageInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.searchFormPageInfo.pageIndex, this.searchFormPageInfo.pageSize)
      this.fetch()
    },
    reset() {
      this.$refs.searchForm.resetFields()
      this.searchFormPageInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.searchFormPageInfo.pageIndex, this.searchFormPageInfo.pageSize)
      this.fetch()
    },
    fetch() {
      const { query } = this.searchForm
      const param = { ...this.searchFormPageInfo, managerName: query, phone: query }
      getProjectManagerList(param).then((res) => {
        console.log('项目经理人列表: ', res)
        const records = res?.data?.records || []
        this.tableData = records
        this.total = res?.data?.total || 0
      })
    },
    handleSizeChange(val) {
      this.searchFormPageInfo.pageSize = val
      this.fetch()
    },
    handleCurrentChange(val) {
      this.searchFormPageInfo.pageIndex = val
      this.fetch()
    },
    createManger() {
      this.$refs.ruleForm.validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          if (this.createLoading) {
            return
          }
          this.createLoading = true
          const { name, id, phone } = this.ruleForm
          const param = { name, id, phone, status: 0 }
          let successTxt = '创建成功'
          if (this.modifyManagerInfo) {
            param.status = this.modifyManagerInfo.status
            param.managerId = this.modifyManagerInfo.managerId
            param.createTime = this.modifyManagerInfo.createTime
            param.updateTime = this.modifyManagerInfo.updateTime
            successTxt = '修改成功'
          }
          this.debounceAjax(param, () => {
            Message({
              message: successTxt,
              type: 'success'
            })
            this.handleQuery()
          })
        }
      })
    },
    debounceAjax: debounce(function({ name, id, phone, status, managerId, createTime, updateTime }, cb) {
      const param = {
        managerName: name,
        managerPhone: phone,
        idCard: id,
        status
      }
      if (typeof managerId !== 'undefined') {
        param.managerId = managerId
        param.updateTime = updateTime
        param.createTime = createTime
      }
      addOrUpdateProjectManager(param).then((res) => {
        typeof cb === 'function' && cb()
      }).finally(() => {
        this.createLoading = false
        this.dialogVisible = false
      })
    }, 200, { leading: true, trailing: false }),
    deleteManager: debounce(function(managerId) {
      deleteProjectManager(managerId).then(() => {
        Message({
          message: '创建经理成功',
          type: 'success'
        })
        this.fetch()
      })
    }, 200, { leading: true, trailing: false })
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
.el-form {
  margin-top: 20px;
}
.search-form {
  margin-top: 0;

  .el-form-item {
    margin-bottom: 0;
  }
}

.red-btn {
  color: #D9001B;
}
</style>
