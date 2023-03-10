<template>
  <div>
    <!-- 审核操作区域 -->
    <detail-title>
      <template slot="btn">
        <el-button v-if="showBtn" :loading="denyLoading" type="danger" @click="handleDenyClickEvent">审核驳回</el-button>
        <el-button v-if="showBtn" :loading="approveLoading" type="primary" @click="handlePassClickEvent">审核通过</el-button>
      </template>
    </detail-title>

    <el-card>
      <h3>申请人信息</h3>
      <div class="el-table el-table--fit el-table--border">
        <table
          class="el-table__body"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody>
            <tr>
              <td class="el-table__cell">申请人姓名</td>
              <td class="el-table__cell">{{ teamInfo.realName || '--' }}</td>
              <td class="el-table__cell">申请人联系方式</td>
              <td class="el-table__cell">{{ teamInfo.phone || '--' }}</td>
              <td class="el-table__cell">申请时间</td>
              <td class="el-table__cell">{{ teamInfo.createTime || '--' }}</td>
            </tr>
            <tr class="min136">
              <td class="el-table__cell">申请人身份证正面</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.idcardImage" :file-list="teamInfo.idcardImage" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
              <td class="el-table__cell">申请人身份证反面</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.idcardImageBack" :file-list="teamInfo.idcardImageBack" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br>

      <h3>施工单位信息</h3>
      <div class="el-table el-table--fit el-table--border">
        <table
          class="el-table__body"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody>
            <tr>
              <td class="el-table__cell">企业名称</td>
              <td class="el-table__cell">{{ teamInfo.companyName || '--' }}</td>
              <td class="el-table__cell">组织机构代码</td>
              <td class="el-table__cell">{{ teamInfo.organiationCode || '--' }}</td>
              <td class="el-table__cell">法人姓名</td>
              <td class="el-table__cell">{{ teamInfo.legalPersionName || '--' }}</td>
            </tr>
            <tr class="min136">
              <td class="el-table__cell">法人身份证正面照片</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.legalPersionIdcardImage" :file-list="teamInfo.legalPersionIdcardImage" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
              <td class="el-table__cell">法人身份证反面照片</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.legalPersionIdcardImageBack" :file-list="teamInfo.legalPersionIdcardImageBack" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
              <td class="el-table__cell">法人身份证号码</td>
              <td class="el-table__cell">{{ teamInfo.legalPersionIdcard || '--' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br>

      <h3>资质与图片</h3>
      <div class="el-table el-table--fit el-table--border">
        <table
          class="el-table__body"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody>
            <tr class="min136">
              <td class="el-table__cell">营业执照</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.charterImage" :file-list="teamInfo.charterImage" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
              <td class="el-table__cell">施工资质文件照片</td>
              <td class="el-table__cell">
                <image-upload-string v-if="teamInfo.constructionQualificationImage" :file-list="teamInfo.constructionQualificationImage" :disabled="true" :limit="1" :multiple="false" fit="fill" />
                <span v-else>--</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </el-card>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import { Message, MessageBox } from 'element-ui'
import { getBuiderTeamById, addOrUpdateTeam } from '@/api/unitManage/index'
import delay from 'lodash/delay'

export default {
  components: { DetailTitle },
  data() {
    return {
      teamInfo: {
        status: undefined,
        realName: '',
        phone: '',
        createTime: '',
        idcardImage: '',
        idcardImageBack: '',
        companyName: '',
        organiationCode: '',
        legalPersionName: '',
        legalPersionIdcard: '',
        legalPersionIdcardImage: '',
        legalPersionIdcardImageBack: '',
        charterImage: '',
        constructionQualificationImage: ''
      },
      teamId: undefined,
      denyLoading: false,
      approveLoading: false
    }
  },
  computed: {
    showBtn() {
      return this.teamInfo?.status === 1 // 待审核
    }
  },
  created() {
    const { teamId } = this.$route.query
    if (!teamId) {
      Message({
        type: 'error',
        message: '链接信息有误'
      })
      return
    }
    this.teamId = teamId
    this.fetchTeamInfo(teamId)
  },
  methods: {
    backRoute() {
      delay(() => {
        this.$router.push({ name: 'unitList' })
      }, 1000)
    },
    // 驳回
    handleDenyClickEvent() {
      MessageBox.prompt('', '请填写驳回理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '输入内容不能为空',
        showClose: false,
        closeOnClickModal: false
      }).then(({ value }) => {
        if (this.denyLoading) {
          return
        }
        this.denyLoading = true
        this.$nextTick(() => {
          this.updateStatus(1, value)
            .then(() => {
              Message({
                type: 'success',
                message: '施工单位已审核驳回'
              })
              this.backRoute()
            })
            .finally(() => {
              this.denyLoading = false
            })
        })
      })
    },
    // 通过
    handlePassClickEvent() {
      MessageBox.confirm('是否通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '输入内容不能为空',
        showClose: false,
        closeOnClickModal: false
      }).then(() => {
        if (this.approveLoading) {
          return
        }
        this.approveLoading = true
        this.$nextTick(() => {
          this.updateStatus(0)
            .then(() => {
              Message({
                type: 'success',
                message: '施工单位已审核通过'
              })
              this.backRoute()
            })
            .finally(() => {
              this.approveLoading = false
            })
        })
      })
    },
    fetchTeamInfo(id) {
      getBuiderTeamById(id).then((res) => {
        console.log('teamInfo: ', res)
        this.teamInfo = res?.data || undefined
      })
    },
    // 更新接口
    updateStatus(status, remark = '') {
      return addOrUpdateTeam({ id: this.teamId, type: status, remark })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;

  ::v-deep {
    .el-upload.el-upload--picture-card, .el-upload-list__item-delete, .el-upload-list__item-status-label {
      display: none !important;
    }
  }
}

.el-table__body {
  width: 100%;

  td {
    text-align: center;
  }

  tr > td:nth-child(odd) {
    background-color: #fafafa;
  }
}
</style>
