<template>
  <el-card>
    <h3>合同签约</h3>
    <el-form ref="ruleForm" label-width="100px" :disabled="disabled" :model="seProjectContract" class="demo-ruleForm" label-position="top">
      <el-form-item prop="rentContractFile">
        <file-upload-string v-model="contract.rentContractFile" :limit="1" accept=".pdf" required @change="validField('rentContractFile')">
          《租赁合同》（限PDF文件）
        </file-upload-string>
      </el-form-item>
      <el-form-item prop="energyConreactFile">
        <file-upload-string v-model="contract.energyConreactFile" :limit="1" accept=".pdf" required @change="validField('energyConreactFile')">
          《能源管理合同》（限PDF文件）
        </file-upload-string>
      </el-form-item>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="editContract">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectContract } from '@/api/developmentProject'
export default {
  inject: ['refreshing'],
  props: {
    seProjectContract: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contract: {},
      submiting: false
    }
  },
  computed: {
    btnLoading() {
      console.log(this)
      return this.refreshing.value || this.submiting || false
    }
  },
  watch: {
    seProjectContract(oldVal, newVal) {
      // console.log('oldVal', oldVal)
      // console.log('newVal', newVal)
      if (oldVal) {
        this.contract = oldVal
      }
    }
  },
  methods: {
    // 合同签约
    editContract() {
      if (this.submiting) { return }
      this.submiting = true
      this.contract.projectId = this.$route.query.projectId
      setProjectContract(this.contract).then(res => {
        this.$message.success(res.msg)
        if (!this.contract.contractId) {
          this.$emit('saveRefresh', 'seProjectContract')
        }
      }).finally(() => {
        this.submiting = false
      })
    },
    validField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
