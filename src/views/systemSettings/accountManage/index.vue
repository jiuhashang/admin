<template>
  <div>
    <list-title />

    <div>
      <admin-account-manage-table />
    </div>

    <div>
      <b-account-manage-table />
    </div>

  </div>
</template>

<script>
import AdminAccountManageTable from '@/components/Table/AdminAccountManageTable.vue'
import BAccountManageTable from '@/components/Table/BAccountManageTable.vue'
import ListTitle from '@/components/ListTitle'
import { mapState } from 'vuex'

export default {
  components: { AdminAccountManageTable, ListTitle, BAccountManageTable },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
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
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('登录密码不能为空'))
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的登录密码'))
        }
      }
    }
    return {
      tableData: [
        {
          1: 13888888888,
          2: '小老弟',
          3: '330101111111111111',
          4: '角色',
          5: '业务开发',
          6: '启用',
          7: '111111'
        }
      ],
      currentPage: 0,
      dialogVisible: false,
      ruleForm: {
        phone: '',
        name: '',
        id: '',
        pwd: '',
        type: '',
        role: '',
        note: ''
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }],
        id: [{ required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: checkId, trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }],
        type: [{ required: true, message: '请选择账号类型', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      avatar: 'user.avatar'
    })
  },
  methods: {
    handleCreate() {
      this.dialogVisible = true
    },
    handleEdit() {},
    handleDisable() {},
    handleEnable() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
</style>
