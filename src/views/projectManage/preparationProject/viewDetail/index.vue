<template>
  <div>
    <!-- 基本信息 -->
    <el-card>
      <h3>基本信息</h3>
      <el-descriptions class="margin-top" :column="3" :size="size" border>
        <!-- <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template> -->
        <el-descriptions-item>
          <template slot="label">
            <!-- <i class="el-icon-user"></i> -->
            项目ID
          </template>
          杭州逐能数字科技有限公司
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <!-- <i class="el-icon-mobile-phone"></i> -->
            创建时间
          </template>
          2021-8-10 10:10:10
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <!-- <i class="el-icon-location-outline"></i> -->
            开发人员
          </template>
          小老弟
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 详细信息 -->
    <el-card>
      <h3>施工单位</h3>
      <el-alert title="* 施工团队一经提交无法更改" type="success" :closable="false" />
      <el-form ref="ruleForm" :model="ruleForm" label-width="130px" class="demo-ruleForm" style="margin-top:20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="选择施工单位：" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <h3>项目经理</h3>
      <el-form ref="ruleForm" :model="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="选择项目经理：" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <h3>逆变器信息</h3>
      <el-form ref="ruleForm" :model="ruleForm" label-width="130px" class="demo-ruleForm">
        <div style="display:flex;justify-content:space-between;">
          <el-form-item label="选择逆变器类型：" prop="name">
            <el-select v-model="ruleForm.region" placeholder="请选择逆变器类型" style="width:392px;">
              <el-option label="低压" value="shanghai" />
              <el-option label="高压" value="beijing" />
            </el-select>
          </el-form-item>
          <div>
            <el-button type="primary">添加逆变器信息</el-button>
          </div>
        </div>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="逆变器位置" />
        <el-table-column prop="date" label="逆变器SN码" />
        <el-table-column prop="date" label="采集器SN码" />
        <el-table-column prop="date" label="上传时间" />
        <el-table-column prop="date" label="操作">
          <el-buttom type="danger">删除</el-buttom>
        </el-table-column>
      </el-table>

      <!-- 图纸管理 -->
      <div style="display:flex;justify-content:space-between;">
        <h3>图纸管理</h3>
        <div style="position:relative;top:15px;">
          <el-button type="primary">添加图纸</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="图纸名称" />
        <el-table-column prop="date" label="上传时间" />
        <el-table-column prop="date" label="操作">
          <el-button type="primary">查看</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>

      <!-- 物料清单 -->
      <div style="display:flex;justify-content:space-between;">
        <h3>物料清单</h3>
        <div style="position:relative;top:15px;">
          <el-button type="primary">添加物料</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="清单名称" />
        <el-table-column prop="date" label="上传时间" />
        <el-table-column prop="date" label="操作">
          <el-button type="primary">查看</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: ''
      },
      tableDate: []
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
