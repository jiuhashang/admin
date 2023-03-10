<template>
  <div>
    <detail-title>
      <template slot="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button v-if="showSubmitBtn && showChangeStatusBtn" type="primary" @click="save()">保存</el-button>
        <el-button v-if="showSubmitBtn && !showChangeStatusBtn" type="primary" @click="save(false, true)">提交</el-button>
        <el-button v-if="showChangeStatusBtn" type="primary" @click="submit">提交</el-button>
      </template>
    </detail-title>

    <el-card>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm" style="margin-top:20px;">
        <h3>施工单位</h3>
        <el-alert title="* 施工团队一经提交无法更改" type="success" :closable="false" />
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="选择施工单位：" prop="buildUserId">
              <builder-select v-model="ruleForm.buildUserId" :disabled="!showChangeStatusBtn" @handleRowChange="handleChange($event, 'buildUserName')" />
            </el-form-item>
          </el-col>
        </el-row>

        <h3>项目经理</h3>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="选择项目经理：" prop="projectManagerId">
              <project-manager-select v-model="ruleForm.projectManagerId" @handleRowChange="handleChange($event, 'projectManagerName')" />
            </el-form-item>
          </el-col>
        </el-row>

        <h3>逆变器信息</h3>
        <div style="display:flex;justify-content:space-between;">
          <el-form-item label="选择逆变器类型：" prop="inverterType">
            <el-select v-model="ruleForm.inverterType" placeholder="请选择逆变器类型" style="width:392px;">
              <el-option label="低压" :value="0" />
              <el-option label="高压" :value="1" />
            </el-select>
          </el-form-item>
          <div>
            <el-button class="mr18" @click="downloadTemplate">导出excel模板</el-button>
            <file-upload ref="invertRef" accept=".xls,.xlsx" :limit="Infinity" :show-file-list="false" :action="inverterInfoUploadUrl" :data="inverterData" style="display: inline-block" @success="inverterUploadSuccess">
              <el-button type="primary">添加逆变器信息</el-button>
            </file-upload>
          </div>
        </div>
      </el-form>
      <!-- 逆变器信息列表 -->
      <el-table :data="ruleForm.seProjectInverterInfoList" style="width: 100%">
        <el-table-column prop="inverterAddress" label="逆变器位置" />
        <el-table-column prop="isInverterCode" label="逆变器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isInverterCode === 0" class="done-status done">有</span>
            <span v-else class="done-status">无</span>
          </template>
        </el-table-column>
        <el-table-column prop="isCollectorCode" label="采集器SN码">
          <template slot-scope="scope">
            <span v-if="scope.row.isCollectorCode === 0" class="done-status done">有</span>
            <span v-else class="done-status">无</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.createTime || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="red" type="text" @click="handleInvertDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>

      <!-- 图纸管理 -->
      <div style="display:flex;justify-content:space-between;">
        <h3>图纸管理</h3>
        <div style="position:relative;top:15px;">
          <file-upload ref="imageRef" accept=".jpg,.jpeg,.png" :limit="Infinity" :show-file-list="false" @success="buildImageUploadSuccess">
            <el-button type="primary">添加图纸</el-button>
          </file-upload>
        </div>
      </div>
      <el-table :data="ruleForm.seProjectBuildImageInfoList" style="width: 100%">
        <el-table-column prop="imageName" label="图纸名称" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleImagePreview(scope)">查看</el-button>
            <el-button class="red" type="text" @click="handleImageDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <br>

      <!-- 物料清单 -->
      <div style="display:flex;justify-content:space-between;">
        <h3>物料清单</h3>
        <div style="position:relative;top:15px;">
          <el-tooltip content="仅能上传一份物料清单文件, 请先删除已有文件再上传" placement="top" effect="light">
            <i class="el-icon-question" />
          </el-tooltip>
          <file-upload ref="goodsListUploadRef" :disabled="goodsUploadBtnDisabled" accept=".xls,.xlsx" :limit="Infinity" :show-file-list="false" style="display: inline-block" @success="goodsListUploadSuccess">
            <el-button type="primary" :disabled="goodsUploadBtnDisabled">添加清单</el-button>
          </file-upload>
        </div>
      </div>
      <el-table :data="ruleForm.seProjectGoodsBillList" style="width: 100%">
        <el-table-column prop="goodsBillName" label="清单名称" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleGoodsFileDownload(scope)">下载</el-button>
            <el-button class="red" type="text" @click="handleGoodsDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import BuilderSelect from '@/components/Select/builderSelect.vue'
import ProjectManagerSelect from '@/components/Select/projectManagerSelect.vue'
import { getProjectPrepareInfo, modifyProjectPrepareInfo, setProjectPrepareSubmit, getDetail } from '@/api/listProject/index'
import { Message, MessageBox } from 'element-ui'

const { VUE_APP_BASE_API } = process.env
const inverterInfoUploadUrl = VUE_APP_BASE_API + '/admin/seProjectInverterInfo/inverterInfoUpload' // 上传逆变器excel的地址
const inverterTemplateExcelDownloadLink = `https://zn-image.obs.cn-east-3.myhuaweicloud.com/excel/%E9%80%86%E5%8F%98%E5%99%A8%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx` // 上传逆变器excel的模板下载地址

export default {
  components: { DetailTitle, BuilderSelect, ProjectManagerSelect },
  data() {
    return {
      projectId: undefined,
      projectReadyStatus: 0,
      inverterInfoUploadUrl: inverterInfoUploadUrl,
      inverterData: { projectId: undefined },
      ruleForm: {
        buildUserId: undefined, // 施工团队
        buildUserName: '',
        projectManagerId: undefined, // 项目经理
        projectManagerName: '',
        inverterType: undefined, // 逆变器类型
        seProjectInverterInfoList: [], // 逆变器 列表
        seProjectBuildImageInfoList: [], // 图纸管理
        seProjectGoodsBillList: [] // 物料清单
      },
      rules: {
        buildUserId: [
          { type: 'number', required: true, message: '请选择施工单位', trigger: 'change' }
        ],
        projectManagerId: [
          { type: 'number', required: true, message: '请选择项目经理', trigger: 'change' }
        ],
        inverterType: [
          { type: 'number', required: true, message: '请选择逆变器类型', trigger: 'change' }
        ]
      },
      tableData: [],
      projectStatus: 11 // 0:待录入；1：待审核；2审核驳回;3审核通过；4:施工进行中；5待审核；6审核驳回；7审核通过；8并网信息待录入；9并网信息待审核；10:并网信息驳回；11：并网信息审核通过
    }
  },
  computed: {
    // 是否展示保存按钮
    showSaveBtn() {
      return this.projectReadyStatus === 0 && this.projectStatus !== 11
    },
    showSubmitBtn() {
      return this.projectStatus !== 11
    },
    goodsUploadBtnDisabled() {
      return this.ruleForm.seProjectGoodsBillList.length !== 0
    },
    showChangeStatusBtn() {
      return this.projectReadyStatus === 0
    }
  },
  created() {
    const { projectId, projectReadyStatus } = this.$route.query
    this.projectId = +projectId
    this.inverterData.projectId = +projectId
    this.projectReadyStatus = +projectReadyStatus
    this.init()
  },
  methods: {
    async save(skipSuccessTip = false, checkInfo = false) {
      if (checkInfo) {
        const bool = await this.checkForm()
        if (!bool) { return false }
        console.log('bool', bool)
      }
      const params = this.getSubmitParams()
      try {
        const res = await modifyProjectPrepareInfo(params)
        if (res.code === 0) {
          if (!skipSuccessTip) {
            Message({
              type: 'success',
              message: '操作成功'
            })
          }
          return true
        }
      } catch (e) { /**/ }
      return false
    },
    async submit() {
      const bool = await this.save(true, true)
      if (!bool) { return }

      await setProjectPrepareSubmit({ projectId: this.projectId })
      Message({
        type: 'success',
        message: '提交信息成功, 正在刷新数据'
      })
      this.init()
    },
    // 检查提交项
    checkForm() {
      return new Promise((res) => {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            Message({
              type: 'warning',
              message: '请先根据提示完善表单'
            })
            res(false)
            return
          }

          const { seProjectInverterInfoList, seProjectBuildImageInfoList, seProjectGoodsBillList } = this.ruleForm
          if (!seProjectInverterInfoList || seProjectInverterInfoList.length === 0) {
            MessageBox.alert('逆变器信息不能为空, 请先上传逆变器信息excel').catch(() => {})
            res(false)
            return
          }

          if (!seProjectBuildImageInfoList || seProjectBuildImageInfoList.length === 0) {
            MessageBox.alert('图纸信息不能为空, 请先上传图纸').catch(() => {})
            res(false)
            return
          }

          if (!seProjectGoodsBillList || seProjectGoodsBillList.length === 0) {
            MessageBox.alert('物料清单信息不能为空, 请先上传物料清单').catch(() => {})
            res(false)
            return
          }

          res(true)
        })
      })
    },
    // 获取form表单的数据
    getSubmitParams() {
      const result = JSON.parse(JSON.stringify(this.ruleForm))
      for (const key in result) {
        if (!Object.prototype.hasOwnProperty.call(result, key)) {
          continue
        }
        const value = result[key]
        if (!value && typeof value === 'string') {
          delete result[key]
        }
      }
      const rest = {
        projectId: this.projectId
      }
      return Object.assign({}, result, rest)
    },
    // 逆变器 上传文件
    inverterUploadSuccess(arg0, file) {
      if (file && file.code === 1) {
        Message({
          type: 'error',
          message: '逆变器列表上传失败：' + file.msg
        })
        return
      }
      if (file && file.code === 0) {
        Message({
          type: 'success',
          message: '逆变器列表上传成功'
        })

        if (file.data.length) {
          const { projectId } = this
          this.ruleForm.seProjectInverterInfoList = [
            ...this.ruleForm.seProjectInverterInfoList,
            ...file.data.map((
              { inverterAddress, isInverterCode, isCollectorCode, createTime }
            ) => {
              return { projectId, inverterAddress, isInverterCode, isCollectorCode, createTime }
            })
          ]
        }
      }
    },
    // 上传图纸
    buildImageUploadSuccess(arg0, file, { name }) {
      if (file && file.code === 0) {
        Message({
          type: 'success',
          message: '图纸上传成功'
        })

        if (file.data) {
          const { projectId } = this
          this.ruleForm.seProjectBuildImageInfoList = [
            ...this.ruleForm.seProjectBuildImageInfoList,
            {
              imageUrl: file.data.url,
              imageName: name,
              projectId
            }
          ]
        }
      }
    },
    // 物料清单文件上传成功
    goodsListUploadSuccess(arg0, file, { name }) {
      if (file && file.code === 0) {
        Message({
          type: 'success',
          message: '物料文件上传成功'
        })

        if (file.data) {
          const { projectId } = this
          this.ruleForm.seProjectGoodsBillList = [
            ...this.ruleForm.seProjectGoodsBillList,
            {
              billUrl: file.data.url,
              goodsBillName: name,
              projectId,
              type: 0
            }
          ]
        }
      }
      this.$refs.goodsListUploadRef.$refs.imageUpload.clearFiles()
    },
    cancel() {
      this.$router.push({
        name: 'preparationProject'
      })
    },
    getPrepareInfo() {
      getProjectPrepareInfo({ projectId: this.projectId }).then(res => {
        console.log('=====> res: ', res)
        const { data: {
          buildUserId, inverterType, projectManagerId, seProjectInverterInfoList, seProjectGoodsBillList, status, seProjectBuildImageInfoList
        }} = res
        const { projectId } = this
        this.ruleForm.buildUserId = buildUserId ?? this.ruleForm.buildUserId
        this.ruleForm.inverterType = inverterType ?? this.ruleForm.inverterType
        this.ruleForm.projectManagerId = projectManagerId ?? this.ruleForm.projectManagerId
        this.ruleForm.seProjectInverterInfoList = seProjectInverterInfoList.map(({ inverterId, inverterAddress, isInverterCode, isCollectorCode, inverterCode, collectorCode, createTime }) => {
          return {
            projectId, inverterId, inverterAddress, isInverterCode, isCollectorCode, inverterCode, collectorCode, createTime
          }
        })
        this.ruleForm.seProjectBuildImageInfoList = seProjectBuildImageInfoList
        this.ruleForm.seProjectGoodsBillList = seProjectGoodsBillList
        this.projectStatus = status
      })
    },
    // 删除逆变器信息
    handleInvertDelete(scope) {
      this.ruleForm.seProjectInverterInfoList.splice(scope.$index, 1)
    },
    // 删除图纸信息
    handleImageDelete(scope) {
      this.ruleForm.seProjectBuildImageInfoList.splice(scope.$index, 1)
    },
    // 图纸预览
    handleImagePreview(scope) {
      this.$viewerApi({
        options: {
          toolbar: true,
          url: 'imageUrl',
          initialViewIndex: scope.$index
        },
        images: this.ruleForm.seProjectBuildImageInfoList
      })
    },
    // 删除物料信息
    handleGoodsDelete(scope) {
      this.ruleForm.seProjectGoodsBillList.splice(scope.$index, 1)
    },
    // 下载上传清单
    handleGoodsFileDownload(scope) {
      window.open(scope.row.billUrl)
    },
    downloadTemplate() {
      window.open(inverterTemplateExcelDownloadLink)
    },
    handleChange($e, keyName) {
      if (!keyName) { return }

      this.$set(this.ruleForm, keyName, $e ? $e.label : '')
    },
    getProjectDetail() {
      getDetail({ projectId: this.projectId }).then(res => {
        if (res.code !== 0) {
          return
        }
        const { projectReadyStatus } = res.data
        this.projectReadyStatus = projectReadyStatus
      })
    },
    init() {
      this.getPrepareInfo()
      this.getProjectDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-alert {
  margin-bottom: 16px;
}

.mr18 {
  margin-right: 18px;
}

.done-status {
  color: #B8741A;

  &.done {
    color: #70B61B;
  }
}
.red {
  color: #A30014;
}

.el-icon-question {
  margin-right: 18px;
  color: #ccc;
  cursor: pointer;
}
</style>
