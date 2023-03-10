<template>
  <div>
    <!-- 审核操作区域 -->
    <detail-title>
      <template slot="btn">
        <el-button @click="handleCancelBtnClickEvent">取消</el-button>
        <el-button v-if="roleId" :loading="approveLoading" type="primary" @click="handleModifySubmit">编辑</el-button>
        <el-button v-else :loading="approveLoading" type="primary" @click="handleCreateSubmit">创建</el-button>
      </template>
    </detail-title>

    <el-card class="pd20">
      <h3>角色信息</h3>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:380px;" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" style="width:380px;" />
        </el-form-item>
        <h3 class="mt40">权限配置</h3>
        <div class="pl20">
          <h6>后台管理（需配置以下后台权限）</h6>
          <div>
            <div class="checkbox-wrap">
              <el-form-item prop="menuIdArr" label-width="0">
                <template v-for="(item, index) in checkboxArr">
                  <check-box-comp
                    :key="index"
                    v-model="ruleForm.menuIdArr[index]"
                    :label="item.label"
                    :options="item.options"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import delay from 'lodash/delay'
import DetailTitle from '@/components/DetailTitle'
import CheckBoxComp from '@/components/Checkbox/index.vue'
import { MenuPermissionArr, getRolePermissionResult } from '@/router/menuPermission'
import { createNewRole, modifyRole, fetchRoleInfo } from '@/api/systemSetting/projectManager'
import { Message } from 'element-ui'

export default {
  components: { DetailTitle, CheckBoxComp },
  data() {
    const checkboxArr = MenuPermissionArr.map((v) => {
      return { ...v, options: v.options.map(({ label, menuId }) => {
        return { label, value: menuId }
      }) }
    })
    // 是否有选择菜单
    const checkMenuEmpty = (rule, value, callback) => {
      if (value.findIndex(v => v.length) === -1) {
        callback(new Error('请至少选择一个菜单'))
        return
      }
      callback()
    }

    return {
      ruleForm: {
        name: '',
        remark: '',
        menuIdArr: ['', '', '']
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        menuIdArr: [
          { validator: checkMenuEmpty, trigger: 'change' }
        ],
        remark: [
          { min: 0, max: 50, message: '长度在50个字符以内', trigger: 'blur' }
        ]
      },
      roleId: undefined,
      approveLoading: false,
      checkboxArr: checkboxArr,
      spare: ''
    }
  },
  created() {
    const { roleId } = this.$route.query
    this.roleId = roleId
    if (roleId) {
      this.fetchRoleInfo()
    }
  },
  methods: {
    routeBack() {
      delay(() => {
        this.$router.push({ name: 'roleManage' })
      }, 1000)
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    // 取消编辑 创建,返回列表
    handleCancelBtnClickEvent() {
      this.$router.push({
        name: 'roleManage'
      })
    },
    // 处理编辑提交
    handleModifySubmit: debounce(function() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return
        }
        this.modifyRole().then(() => {
          this.routeBack()
          Message({
            type: 'success',
            message: '修改角色成功'
          })
        })
      })
    }, 200, { leading: true, trailing: false }),
    // 处理创建提交
    handleCreateSubmit: debounce(function() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return
        }
        this.createNewRole().then(() => {
          this.routeBack()
          Message({
            type: 'success',
            message: '创建新角色成功'
          })
        })
      })
    }, 200, { leading: true, trailing: false }),
    // 创建新角色
    createNewRole() {
      const params = this.getParams()
      return createNewRole(params)
    },
    modifyRole() {
      const params = this.getParams()
      params.id = this.roleId
      params.menuId += (params.menuId ? ',' : '') + this.spare
      return modifyRole(params)
    },
    // 获取参数
    getParams() {
      const { name, remark, menuIdArr } = this.ruleForm
      const params = {
        roleName: name,
        remark,
        menuId: menuIdArr.reduce((s, c) => {
          let pre = ''
          if (s) {
            pre = ','
          }
          if (c) {
            s = s + pre + c
          }
          return s
        }, '')
      }
      return params
    },
    fetchRoleInfo() {
      fetchRoleInfo(this.roleId).then(({ data: { roleName, remark, menuId }}) => {
        this.ruleForm.name = roleName
        this.ruleForm.remark = remark
        const { result, spare } = getRolePermissionResult(menuId)
        this.ruleForm.menuIdArr = result
        this.spare = spare
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}

.pd20 {
  padding-bottom: 20px;
}

.pl20 {
  margin: 20px 0 0 20px;
}

.mt40 {
  margin-top: 40px;
}

.checkbox-wrap {
  padding: 16px;
  border: 1px solid #ccc;

  ::v-deep .el-checkbox-group {
    padding: 8px 0 18px 20px;

    .el-checkbox {
      margin-bottom: 12px;
    }
  }

}
</style>
