<template>
  <div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <span class="title">业务APP账号</span>
          <el-form-item>
            <el-input v-model="tableInfo.query" placeholder="手机号码、姓名查询" clearable style="width:300px;" />
          </el-form-item>
          <el-form-item prop="status" label="账号状态：" style="margin: 0 30px">
            <el-radio-group v-model="tableInfo.status">
              <el-radio-button :label="undefined">全部</el-radio-button>
              <el-radio-button :label="1">启用</el-radio-button>
              <el-radio-button :label="2">停用</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="handleCreateRoleClickEvent">创建账户</el-button>
        </div>
      </div>
      <el-table :data="tableData" size="mini" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="phone" label="手机号码" width="250" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="green-btn">启用</span>
            <span v-else-if="scope.row.status === 0" class="red-btn">新建</span>
            <span v-else class="red-btn">停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
            <el-button v-if="scope.row.status !== 1" type="text" @click="handleDelete(scope.row)">启用账号</el-button>
            <el-button v-else type="text" @click="handleDelete(scope.row)">停用账号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :default-page-size="5" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <el-dialog :title="modifyItem ? '编辑账号' : '创建账号'" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" :disabled="!!modifyItem" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="ruleForm.idCard" />
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd" :rules="pwdRules">
          <el-input v-model="ruleForm.pwd" :placeholder="pwdPlaceholder" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="ruleForm.note" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!modifyItem" :loading="submitLoading" type="primary" @click="handleSubmit">创 建</el-button>
        <el-button v-else :loading="submitLoading" type="primary" @click="handleSubmit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBusinessAccountUserList, modifyBusinessAccountUser, createBusinessAccountUser } from '@/api/systemSetting/projectManager'
import { checkPhone, checkId, checkName, checkPwd, checkChangePwd } from '@/utils/formItemValid'
import { MessageBox, Message } from 'element-ui'
// import RoleSelect from '@/components/Select/RoleSelect.vue'
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'

export default {
  name: 'RoleManagePage',
  data() {
    return {
      tableInfo: {
        query: '',
        status: undefined
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 5
      },
      tableData: [],
      multipleSelection: [],
      total: null,
      modifyItem: null, // 被修改的记录的item
      dialogVisible: false,
      ruleForm: {
        phone: '',
        userName: '',
        idCard: '',
        pwd: '',
        roleId: undefined,
        note: ''
      },
      submitLoading: false,
      rules: {
        phone: [
          { type: 'string', required: true, message: '手机号信息不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        userName: [
          { type: 'string', required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        idCard: [
          { type: 'string', required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: checkId, trigger: 'blur' }
        ],
        roleId: [
          { type: 'number', required: true, message: '请选择用户角色', trigger: 'change' }
        ],
        note: [
          { min: 0, max: 50, message: '请控制在50个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      avatar: 'user.avatar'
    }),
    pwdRules() {
      return !this.modifyItem ? [
        { type: 'string', required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: checkPwd, trigger: 'blur' }
      ] : [{ validator: checkChangePwd, trigger: 'blur' }]
    },
    pwdPlaceholder() {
      return this.modifyItem ? '不修改密码请勿编辑本项' : ''
    }
  },
  created() {
    this.$emit('init', this.tableInfo)
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      const { query, ...resetTableInfo } = this.tableInfo
      const param = { ...resetTableInfo, ...this.queryInfo, phone: query, userName: query }
      getBusinessAccountUserList(param).then(res => {
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
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: '',
        status: undefined
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 5
      }
      this.$emit('reset', this.tableInfo)
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 创建新角色
    async handleCreateRoleClickEvent() {
      this.ruleForm = {
        phone: '',
        userName: '',
        idCard: '',
        pwd: '',
        roleId: undefined,
        note: ''
      }
      this.modifyItem = null
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.ruleForm.clearValidate()
    },
    // 查看详情
    async handleEdit(row) {
      const { idCard, userName, roleId, remark, nickName } = row
      this.ruleForm = {
        phone: userName,
        userName: nickName,
        idCard: idCard,
        pwd: '',
        roleId: roleId,
        note: remark
      }
      this.modifyItem = row
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.ruleForm.clearValidate()
    },
    // 启停
    handleDelete(row) {
      const { status } = row
      const nextStatus = status === 1 ? 2 : 1
      const tip = nextStatus === 1 ? '启用' : '停用'
      MessageBox.confirm(`确认${tip}该账户?`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManager(row, { status: nextStatus }).then(() => {
          Message({
            type: 'success',
            message: `${tip}账户操作成功`
          })
          this.getList()
        })
      })
    },

    deleteManager(roleInfo, params) {
      return modifyBusinessAccountUser(Object.assign({}, roleInfo, { ...params }))
    },

    // 提交创建 or 编辑
    handleSubmit: debounce(async function() {
      if (this.submitLoading) {
        return
      }

      this.submitLoading = true
      try {
        await this.$refs.ruleForm.validate()
      } catch (e) {
        this.submitLoading = false
        return
      }

      let promise
      let tips
      const params = this.getAjaxParams()
      if (this.modifyItem) {
        promise = modifyBusinessAccountUser(params)
        tips = `编辑`
      } else {
        promise = createBusinessAccountUser(params)
        tips = `创建`
      }

      promise.then(() => {
        Message({
          type: 'success',
          message: `${tips}账户成功`
        })
        this.dialogVisible = false
        if (this.modifyItem) {
          this.getList()
        } else {
          this.handleCurrentChange(1)
        }
      }).finally(() => {
        this.submitLoading = false
      })
    }, 200, { leading: true, trailing: false }),

    // 获取ajax的入参数据
    getAjaxParams() {
      const { phone, pwd, userName, idCard, roleId, note } = this.ruleForm
      const result = {
        userName: phone, password: pwd, nickName: userName, image: this.avatar, status: 0, roleId, phone, idCard, remark: note
      }
      if (this.modifyItem) {
        delete result.status
        result.id = +this.modifyItem.id
        if (!result.password) {
          delete result.password
        }
      }
      return result
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

.green-btn {
  color: #70B603;
}

.title {
  line-height: 32px;
  margin-right: 30px;
  font-weight: 600;
  font-size: 22px;
}

.demo-ruleForm {
  margin-right: 30px;
}
</style>
