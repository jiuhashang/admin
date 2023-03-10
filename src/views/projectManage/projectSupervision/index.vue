<template>
  <div>
    <list-title />
    <project-supervision-table ref="tableForm" />
  </div>
</template>

<script>
import ListTitle from '@/components/ListTitle'
import ProjectSupervisionTable from '@/components/Table/ProjectSupervisionTable'

export default {
  components: { ProjectSupervisionTable, ListTitle },
  data() {
    return {}
  },
  created() {
  },
  activated() {
    this.$refs.tableForm.getList()
  },
  methods: {
    handleView() {
      this.$router.push('projectSupervisionDetail')
    },
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
