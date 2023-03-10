<template>
  <el-card>
    <h3>基本信息</h3>
    <el-descriptions class="margin-top" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          项目ID
        </template>
        {{ displayProjectId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建时间
        </template>
        {{ displayCreateTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          开发人员
        </template>
        {{ displayCreateUser }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  props: {
    projectId: {
      type: String,
      default: undefined
    },
    createTime: {
      type: String,
      default: undefined
    },
    createUser: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      size: 'small'
    }
  },
  computed: {
    displayProjectId() {
      return this.getVal('projectId')
    },
    displayCreateTime() {
      return this.getVal('createTime')
    },
    displayCreateUser() {
      return this.getVal('createUser')
    }
  },
  methods: {
    getVal(key) {
      return this[key] ?? this.$route.query[key]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
