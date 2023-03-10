<template>
  <div>
    <el-table
      :data="dataSource"
      border
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      class="relation-info-box relation-info-box-fas10"
    >
      <slot />
    </el-table>
  </div>
</template>
<script>

export default {
  components: {
  },
  model: {
    prop: 'dataSource',
    event: 'change'
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  method: {
    handleChange(fileArr) {
      this.$emit('change', fileArr.join(','))
    }
  }
}
</script>

<style scoped>
::v-deep .relation-info-box-fas10  .el-form-item:not(.is-error) {
  margin-bottom: 0 !important;
}
</style>
