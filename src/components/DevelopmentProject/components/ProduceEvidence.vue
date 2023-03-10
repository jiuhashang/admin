<template>
  <el-card>
    <h3>建筑物产证情况</h3>
    <el-form ref="ruleForm" :rules="rules" :model="seProjectCompanyBuildInfo" :disabled="disabled" label-width="100px" class="demo-ruleForm must-form-item" label-position="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="是否存在建筑物抵押情况" prop="isMortgageFlag">
            <el-select v-model="companyBuildInfo.isMortgageFlag" style="width:100%;">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form-item label="厂房房产证照片（最多5张）" prop="houseCardImgae">
            <image-upload-string v-model="companyBuildInfo.houseCardImgae" :limit="5" fit="fill" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="厂房建设规划许可证照片（最多5张）" prop="bulidAllowImage">
            <image-upload-string v-model="companyBuildInfo.bulidAllowImage" :limit="5" fit="fill" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂房土地证照片（最多5张）" prop="landCardImage">
            <image-upload-string v-model="companyBuildInfo.landCardImage" :limit="5" fit="fill" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="addBuildInfo">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectCompanyBuildInfo } from '@/api/developmentProject'
export default {
  inject: ['refreshing'],
  props: {
    seProjectCompanyBuildInfo: {
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
      companyBuildInfo: {
        projectId: this.$route.query.projectId,
        isMortgageFlag: undefined,
        isHouseCard: undefined,
        houseCardImgae: '',
        bulidAllowImage: '',
        landCardImage: ''
      },
      rules: {
        // isMortgageFlag: [{ message: '请选择建筑物抵押情况', trigger: 'change' }],
        houseCardImgae: [{ message: '请上传厂房房产证照片', trigger: 'blur' }],
        bulidAllowImage: [{ message: '请上传厂房建设规划许可证照片', trigger: 'blur' }],
        landCardImage: [{ message: '请上传厂房土地证照片', trigger: 'blur' }]
      },
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
    seProjectCompanyBuildInfo(oldVal, newVal) {
      // console.log('oldVal', oldVal)
      // console.log('newVal', newVal)
      this.companyBuildInfo = oldVal
    }
  },
  methods: {
    async addBuildInfo() {
      const confirmResult = await this.$confirm('此操作会进行修改，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      if (this.submiting) { return }
      this.submiting = true
      setProjectCompanyBuildInfo(this.companyBuildInfo).then(res => {
        // console.log(res)
        this.$message.success(res.msg)
        if (!this.companyBuildInfo.buildCardId) {
          this.$emit('saveRefresh', 'seProjectCompanyBuildInfo')
        }
      }).finally(() => {
        this.submiting = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
